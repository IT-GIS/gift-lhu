"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  History,
  ImagePlus,
  LayoutGrid,
  Minus,
  Redo2,
  Save,
  Table2,
  Trash2,
  Type,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  publishLayoutVersionAction,
  resetPdfLayoutAction,
  savePdfLayoutAction,
} from "@/app/(app)/settings/pdf-template-layout/actions";
import {
  createLayoutElement,
  PDF_DYNAMIC_IMAGE_BINDINGS,
  PDF_DYNAMIC_TEXT_BINDINGS,
  type PdfAttachmentGridElement,
  type PdfDynamicImageBinding,
  type PdfDynamicImageElement,
  type PdfDynamicTextBinding,
  type PdfDynamicTextElement,
  type PdfLayoutElement,
  type PdfLayoutElementType,
  type PdfPageId,
  type PdfResultsTableElement,
  type PdfStaticImageElement,
  type PdfStaticTextElement,
  type PdfTemplateLayoutMap,
} from "@/lib/pdf/lhu-template-default-map";
import { createSamplePdfLayoutRenderData } from "@/lib/pdf/pdf-layout-render-data";
import { PdfLayoutPageRenderer } from "@/components/pdf/pdf-layout-renderer";

interface LayoutHistoryItem {
  id: string;
  versionNumber: number;
  createdAt: string;
  notes?: string | null;
  isPublish: boolean;
}

interface LayoutEditorProps {
  initialLayout: PdfTemplateLayoutMap;
  activeVersionId: string | null;
  activeVersionNumber: number | null;
  history: LayoutHistoryItem[];
}

interface DragState {
  elementId: string;
  pageId: PdfPageId;
  startClientX: number;
  startClientY: number;
  originX: number;
  originY: number;
  pageWidth: number;
  pageHeight: number;
  elementWidth: number;
  elementHeight: number;
  snapshot: PdfTemplateLayoutMap;
}

interface ResizeState {
  elementId: string;
  pageId: PdfPageId;
  startClientX: number;
  startClientY: number;
  originWidth: number;
  originHeight: number;
  originX: number;
  originY: number;
  pageWidth: number;
  pageHeight: number;
  snapshot: PdfTemplateLayoutMap;
}

const previewData = createSamplePdfLayoutRenderData();
const selectClassName =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const MAX_HISTORY_STEPS = 80;

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function layoutsAreEqual(first: PdfTemplateLayoutMap, second: PdfTemplateLayoutMap) {
  return JSON.stringify(first) === JSON.stringify(second);
}

function getElementTypeLabel(type: PdfLayoutElementType) {
  switch (type) {
    case "staticText":
      return "Teks Bebas";
    case "dynamicText":
      return "Teks Dinamis";
    case "staticImage":
      return "Gambar Bebas";
    case "dynamicImage":
      return "Gambar Dinamis";
    case "line":
      return "Garis";
    case "resultsTable":
      return "Tabel Hasil";
    case "attachmentGrid":
      return "Grid Lampiran";
  }
}

export function PdfLayoutEditorClient({
  initialLayout,
  activeVersionId,
  activeVersionNumber,
  history,
}: LayoutEditorProps) {
  const router = useRouter();
  const [layout, setLayout] = useState<PdfTemplateLayoutMap>(initialLayout);
  const [undoStack, setUndoStack] = useState<PdfTemplateLayoutMap[]>([]);
  const [redoStack, setRedoStack] = useState<PdfTemplateLayoutMap[]>([]);
  const [activePageId, setActivePageId] = useState<PdfPageId>(
    initialLayout.pages[0]?.id ?? "page1",
  );
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    initialLayout.elements[0]?.id ?? null,
  );
  const [scale, setScale] = useState(0.72);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishingHistory, setIsPublishingHistory] = useState<string | null>(null);
  const layoutRef = useRef(layout);
  const uploadPhotoInputRef = useRef<HTMLInputElement | null>(null);

  const activePage = layout.pages.find((page) => page.id === activePageId) ?? layout.pages[0];
  const pageElements = layout.elements
    .filter((element) => element.pageId === activePageId)
    .sort((first, second) => first.zIndex - second.zIndex);
  const selectedElement =
    layout.elements.find((element) => element.id === selectedElementId) ?? null;

  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  function rememberForUndo(snapshot: PdfTemplateLayoutMap) {
    setUndoStack((prev) => [...prev.slice(-(MAX_HISTORY_STEPS - 1)), deepClone(snapshot)]);
    setRedoStack([]);
  }

  function applyCommittedLayout(
    producer: (current: PdfTemplateLayoutMap) => PdfTemplateLayoutMap,
  ) {
    const current = layoutRef.current;
    const next = producer(deepClone(current));

    if (layoutsAreEqual(current, next)) {
      return false;
    }

    rememberForUndo(current);
    setLayout(next);
    return true;
  }

  function handleUndo() {
    if (undoStack.length === 0 || dragState || resizeState) return;

    const previous = undoStack[undoStack.length - 1];
    const current = deepClone(layoutRef.current);

    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev.slice(-(MAX_HISTORY_STEPS - 1)), current]);
    setLayout(deepClone(previous));
  }

  function handleRedo() {
    if (redoStack.length === 0 || dragState || resizeState) return;

    const next = redoStack[redoStack.length - 1];
    const current = deepClone(layoutRef.current);

    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev.slice(-(MAX_HISTORY_STEPS - 1)), current]);
    setLayout(deepClone(next));
  }

  useEffect(() => {
    if (
      selectedElementId &&
      layout.elements.some(
        (element) => element.id === selectedElementId && element.pageId === activePageId,
      )
    ) {
      return;
    }

    setSelectedElementId(pageElements[0]?.id ?? null);
  }, [activePageId, layout.elements, pageElements, selectedElementId]);

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = (event.clientX - dragState.startClientX) / scale;
      const deltaY = (event.clientY - dragState.startClientY) / scale;
      const nextX = Math.round(dragState.originX + deltaX);
      const nextY = Math.round(dragState.originY + deltaY);
      const maxX = dragState.pageWidth - Math.max(Math.abs(dragState.elementWidth), 20);
      const maxY = dragState.pageHeight - Math.max(Math.abs(dragState.elementHeight), 20);

      setLayout((prev) => ({
        ...prev,
        elements: prev.elements.map((element) =>
          element.id === dragState.elementId
            ? {
                ...element,
                x: Math.max(0, Math.min(nextX, maxX)),
                y: Math.max(0, Math.min(nextY, maxY)),
              }
            : element,
        ),
      }));
    };

    const handlePointerUp = () => {
      const current = layoutRef.current;

      if (!layoutsAreEqual(current, dragState.snapshot)) {
        rememberForUndo(dragState.snapshot);
      }

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      setDragState(null);
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState, scale]);

  useEffect(() => {
    if (!resizeState) return;

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = (event.clientX - resizeState.startClientX) / scale;
      const deltaY = (event.clientY - resizeState.startClientY) / scale;
      const nextWidth = Math.round(resizeState.originWidth + deltaX);
      const nextHeight = Math.round(resizeState.originHeight + deltaY);
      const maxWidth = resizeState.pageWidth - resizeState.originX;
      const maxHeight = resizeState.pageHeight - resizeState.originY;

      setLayout((prev) => ({
        ...prev,
        elements: prev.elements.map((element) =>
          element.id === resizeState.elementId
            ? {
                ...element,
                width: Math.max(24, Math.min(nextWidth, maxWidth)),
                height: Math.max(24, Math.min(nextHeight, maxHeight)),
              }
            : element,
        ),
      }));
    };

    const handlePointerUp = () => {
      const current = layoutRef.current;

      if (!layoutsAreEqual(current, resizeState.snapshot)) {
        rememberForUndo(resizeState.snapshot);
      }

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      setResizeState(null);
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "se-resize";
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [resizeState, scale]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const withModifier = event.ctrlKey || event.metaKey;
      if (!withModifier) return;

      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
        return;
      }

      if (key === "y" || (key === "z" && event.shiftKey)) {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dragState, redoStack.length, resizeState, undoStack.length]);

  function updateSelectedElement(updater: (element: PdfLayoutElement) => PdfLayoutElement) {
    if (!selectedElementId) return;

    applyCommittedLayout((current) => ({
      ...current,
      elements: current.elements.map((element) =>
        element.id === selectedElementId ? updater(deepClone(element)) : element,
      ),
    }));
  }

  function updateSelectedElementField(field: string, value: unknown) {
    updateSelectedElement((element) => {
      (element as unknown as Record<string, unknown>)[field] = value;
      return element;
    });
  }

  function updateTableColumn(
    index: number,
    field: "label" | "valueKey" | "width" | "align",
    value: string | number,
  ) {
    updateSelectedElement((element) => {
      if (element.type !== "resultsTable") return element;

      const columns = element.columns.map((column, columnIndex) =>
        columnIndex === index ? { ...column, [field]: value } : column,
      );

      return {
        ...element,
        columns,
      };
    });
  }

  function handleAddElement(type: PdfLayoutElementType) {
    const nextElement = createLayoutElement(type, activePageId);

    applyCommittedLayout((current) => ({
      ...current,
      elements: [...current.elements, nextElement],
    }));
    setSelectedElementId(nextElement.id);
  }

  function handleDuplicateElement() {
    if (!selectedElement) return;

    const duplicated = deepClone(selectedElement);
    duplicated.id = `${duplicated.id}-copy-${Date.now()}`;
    duplicated.name = `${duplicated.name} Copy`;
    duplicated.x += 12;
    duplicated.y += 12;

    applyCommittedLayout((current) => ({
      ...current,
      elements: [...current.elements, duplicated],
    }));
    setSelectedElementId(duplicated.id);
  }

  function handleDeleteElement() {
    if (!selectedElementId) return;
    if (!confirm("Hapus elemen yang sedang dipilih dari layout?")) return;

    applyCommittedLayout((current) => ({
      ...current,
      elements: current.elements.filter((element) => element.id !== selectedElementId),
    }));
  }

  async function handleSave(publishImmediately: boolean) {
    setIsSaving(true);
    const notes = window.prompt("Catatan versi ini (opsional):");

    try {
      const result = await savePdfLayoutAction(layout, publishImmediately, notes || undefined);
      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      window.alert(`Gagal menyimpan layout: ${message}`);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReset() {
    if (
      !confirm(
        "Reset ke layout default sistem? Versi custom tetap tersimpan di history, tetapi tidak lagi aktif.",
      )
    ) {
      return;
    }

    try {
      await resetPdfLayoutAction();
      router.refresh();
      window.location.reload();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      window.alert(`Gagal reset layout: ${message}`);
    }
  }

  async function handlePublishHistory(versionId: string) {
    setIsPublishingHistory(versionId);

    try {
      await publishLayoutVersionAction(versionId);
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      window.alert(`Gagal publish versi layout: ${message}`);
    } finally {
      setIsPublishingHistory(null);
    }
  }

  function handleUploadPhotoButtonClick() {
    uploadPhotoInputRef.current?.click();
  }

  function handleCreateUploadedImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const nextElement = createLayoutElement("staticImage", activePageId) as PdfStaticImageElement;
      nextElement.src = String(reader.result ?? "");
      nextElement.name = file.name ? `Foto: ${file.name}` : "Foto";

      applyCommittedLayout((current) => ({
        ...current,
        elements: [...current.elements, nextElement],
      }));
      setSelectedElementId(nextElement.id);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function handleStaticImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateSelectedElement((element) => {
        if (element.type !== "staticImage") return element;
        element.src = String(reader.result ?? "");
        return element;
      });
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    element: PdfLayoutElement,
  ) {
    const page = layout.pages.find((item) => item.id === element.pageId);
    if (!page) return;

    setSelectedElementId(element.id);
    setDragState({
      elementId: element.id,
      pageId: element.pageId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      originX: element.x,
      originY: element.y,
      pageWidth: page.width,
      pageHeight: page.height,
      elementWidth: element.width,
      elementHeight: element.height,
      snapshot: deepClone(layoutRef.current),
    });
  }

  function handleResizePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    element: PdfLayoutElement,
  ) {
    const page = layout.pages.find((item) => item.id === element.pageId);
    if (!page) return;

    event.preventDefault();
    setSelectedElementId(element.id);
    setResizeState({
      elementId: element.id,
      pageId: element.pageId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      originWidth: element.width,
      originHeight: element.height,
      originX: element.x,
      originY: element.y,
      pageWidth: page.width,
      pageHeight: page.height,
      snapshot: deepClone(layoutRef.current),
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
      <input
        ref={uploadPhotoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCreateUploadedImage}
      />

      <div className="space-y-6">
        <Card className="space-y-4 border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Kanvas Template
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Basis layout menggunakan `Bingkai_pdf.png` dengan elemen bebas.
              </div>
            </div>
            {activeVersionId ? (
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                Aktif v{activeVersionNumber}
              </div>
            ) : (
              <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Default
              </div>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {layout.pages.map((page) => (
              <button
                key={page.id}
                type="button"
                className={`rounded-xl border px-3 py-3 text-left transition ${
                  activePageId === page.id
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
                onClick={() => setActivePageId(page.id)}
              >
                <div className="text-sm font-semibold">{page.name}</div>
                <div className="text-[11px] opacity-80">
                  {page.width} x {page.height}px
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Tambah Elemen
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" variant="outline" className="justify-start" onClick={() => handleAddElement("staticText")}>
                <Type className="mr-2 h-4 w-4" />
                Teks Bebas
              </Button>
              <Button type="button" variant="outline" className="justify-start" onClick={() => handleAddElement("dynamicText")}>
                <Type className="mr-2 h-4 w-4" />
                Teks Dinamis
              </Button>
              <Button type="button" variant="outline" className="justify-start" onClick={() => handleAddElement("staticImage")}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Gambar Bebas
              </Button>
              <Button type="button" variant="outline" className="justify-start" onClick={() => handleAddElement("dynamicImage")}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Gambar Dinamis
              </Button>
              <Button type="button" variant="outline" className="justify-start" onClick={handleUploadPhotoButtonClick}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload Foto
              </Button>
              <Button type="button" variant="outline" className="justify-start" onClick={() => handleAddElement("line")}>
                <Minus className="mr-2 h-4 w-4" />
                Garis
              </Button>
              <Button type="button" variant="outline" className="justify-start" onClick={() => handleAddElement("resultsTable")}>
                <Table2 className="mr-2 h-4 w-4" />
                Tabel Hasil
              </Button>
              <Button type="button" variant="outline" className="justify-start sm:col-span-2" onClick={() => handleAddElement("attachmentGrid")}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid Lampiran
              </Button>
            </div>
          </div>
        </Card>

        <Card className="space-y-4 border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Elemen Halaman
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Klik elemen untuk edit properti atau geser langsung dari preview.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleDuplicateElement} disabled={!selectedElement}>
                <Copy className="mr-2 h-4 w-4" />
                Duplikat
              </Button>
              <Button type="button" variant="outline" size="sm" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={handleDeleteElement} disabled={!selectedElement}>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {pageElements.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
                Belum ada elemen di halaman ini.
              </div>
            ) : (
              pageElements.map((element) => (
                <button
                  key={element.id}
                  type="button"
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    selectedElementId === element.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                  }`}
                  onClick={() => setSelectedElementId(element.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {element.name}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        {getElementTypeLabel(element.type)}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {element.x}, {element.y}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        <Card className="space-y-4 border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Properti Elemen
          </div>

          {!selectedElement ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">
              Pilih elemen dari daftar atau dari preview agar propertinya muncul di sini.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Nama Elemen</Label>
                  <Input value={selectedElement.name} onChange={(event) => updateSelectedElementField("name", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>X</Label>
                  <Input type="number" value={selectedElement.x} onChange={(event) => updateSelectedElementField("x", Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Y</Label>
                  <Input type="number" value={selectedElement.y} onChange={(event) => updateSelectedElementField("y", Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Width</Label>
                  <Input type="number" value={selectedElement.width} onChange={(event) => updateSelectedElementField("width", Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Height</Label>
                  <Input type="number" value={selectedElement.height} onChange={(event) => updateSelectedElementField("height", Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Opacity</Label>
                  <Input type="number" min="0" max="1" step="0.1" value={selectedElement.opacity} onChange={(event) => updateSelectedElementField("opacity", Number(event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Z-Index</Label>
                  <Input type="number" value={selectedElement.zIndex} onChange={(event) => updateSelectedElementField("zIndex", Number(event.target.value))} />
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm dark:border-slate-700">
                <input
                  type="checkbox"
                  checked={selectedElement.visible}
                  onChange={(event) => updateSelectedElementField("visible", event.target.checked)}
                />
                Tampilkan elemen ini
              </label>

              {(selectedElement.type === "staticText" || selectedElement.type === "dynamicText") && (
                <div className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pengaturan Teks
                  </div>

                  {selectedElement.type === "staticText" ? (
                    <div className="space-y-2">
                      <Label>Isi Teks</Label>
                      <Textarea
                        value={(selectedElement as PdfStaticTextElement).text}
                        onChange={(event) => updateSelectedElementField("text", event.target.value)}
                        className="min-h-[110px]"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Binding Data</Label>
                      <select
                        className={selectClassName}
                        value={(selectedElement as PdfDynamicTextElement).binding}
                        onChange={(event) =>
                          updateSelectedElementField(
                            "binding",
                            event.target.value as PdfDynamicTextBinding,
                          )
                        }
                      >
                        {PDF_DYNAMIC_TEXT_BINDINGS.map((binding) => (
                          <option key={binding.value} value={binding.value}>
                            {binding.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Input type="number" value={selectedElement.fontSize} onChange={(event) => updateSelectedElementField("fontSize", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Line Height</Label>
                      <Input type="number" step="0.1" value={selectedElement.lineHeight} onChange={(event) => updateSelectedElementField("lineHeight", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <Input value={selectedElement.color} onChange={(event) => updateSelectedElementField("color", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Align</Label>
                      <select
                        className={selectClassName}
                        value={selectedElement.align}
                        onChange={(event) => updateSelectedElementField("align", event.target.value)}
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Weight</Label>
                      <select
                        className={selectClassName}
                        value={selectedElement.fontWeight}
                        onChange={(event) => updateSelectedElementField("fontWeight", event.target.value)}
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {selectedElement.type === "staticImage" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pengaturan Gambar Bebas
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Gambar</Label>
                    <Input type="file" accept="image/*" onChange={handleStaticImageUpload} />
                  </div>
                  <div className="space-y-2">
                    <Label>Image Source / Data URL</Label>
                    <Textarea
                      value={(selectedElement as PdfStaticImageElement).src}
                      onChange={(event) => updateSelectedElementField("src", event.target.value)}
                      className="min-h-[110px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fit</Label>
                    <select
                      className={selectClassName}
                      value={(selectedElement as PdfStaticImageElement).fit}
                      onChange={(event) => updateSelectedElementField("fit", event.target.value)}
                    >
                      <option value="contain">Contain</option>
                      <option value="cover">Cover</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedElement.type === "dynamicImage" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pengaturan Gambar Dinamis
                  </div>
                  <div className="space-y-2">
                    <Label>Binding Gambar</Label>
                    <select
                      className={selectClassName}
                      value={(selectedElement as PdfDynamicImageElement).binding}
                      onChange={(event) =>
                        updateSelectedElementField(
                          "binding",
                          event.target.value as PdfDynamicImageBinding,
                        )
                      }
                    >
                      {PDF_DYNAMIC_IMAGE_BINDINGS.map((binding) => (
                        <option key={binding.value} value={binding.value}>
                          {binding.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fit</Label>
                    <select
                      className={selectClassName}
                      value={(selectedElement as PdfDynamicImageElement).fit}
                      onChange={(event) => updateSelectedElementField("fit", event.target.value)}
                    >
                      <option value="contain">Contain</option>
                      <option value="cover">Cover</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedElement.type === "line" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pengaturan Garis
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Stroke Width</Label>
                      <Input type="number" step="0.1" value={selectedElement.strokeWidth} onChange={(event) => updateSelectedElementField("strokeWidth", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Stroke Color</Label>
                      <Input value={selectedElement.strokeColor} onChange={(event) => updateSelectedElementField("strokeColor", event.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {selectedElement.type === "resultsTable" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pengaturan Tabel Hasil
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Input type="number" value={selectedElement.fontSize} onChange={(event) => updateSelectedElementField("fontSize", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Header Font Size</Label>
                      <Input type="number" value={selectedElement.headerFontSize} onChange={(event) => updateSelectedElementField("headerFontSize", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Row Height</Label>
                      <Input type="number" value={selectedElement.rowHeight} onChange={(event) => updateSelectedElementField("rowHeight", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Header Height</Label>
                      <Input type="number" value={selectedElement.headerHeight} onChange={(event) => updateSelectedElementField("headerHeight", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Cell Padding</Label>
                      <Input type="number" value={selectedElement.cellPadding} onChange={(event) => updateSelectedElementField("cellPadding", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Rows</Label>
                      <Input type="number" value={selectedElement.maxRows} onChange={(event) => updateSelectedElementField("maxRows", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Border Color</Label>
                      <Input value={selectedElement.borderColor} onChange={(event) => updateSelectedElementField("borderColor", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Header Fill</Label>
                      <Input value={selectedElement.headerFillColor} onChange={(event) => updateSelectedElementField("headerFillColor", event.target.value)} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Text Color</Label>
                      <Input value={selectedElement.textColor} onChange={(event) => updateSelectedElementField("textColor", event.target.value)} />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm dark:border-slate-700">
                      <input type="checkbox" checked={selectedElement.showHeader} onChange={(event) => updateSelectedElementField("showHeader", event.target.checked)} />
                      Tampilkan header
                    </label>
                    <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm dark:border-slate-700">
                      <input type="checkbox" checked={selectedElement.showGrid} onChange={(event) => updateSelectedElementField("showGrid", event.target.checked)} />
                      Tampilkan grid
                    </label>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Kolom Tabel
                    </div>
                    {(selectedElement as PdfResultsTableElement).columns.map((column, index) => (
                      <div key={column.id} className="space-y-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {column.id}
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Label</Label>
                            <Input value={column.label} onChange={(event) => updateTableColumn(index, "label", event.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Value Key</Label>
                            <Input value={column.valueKey} onChange={(event) => updateTableColumn(index, "valueKey", event.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Width</Label>
                            <Input type="number" value={column.width} onChange={(event) => updateTableColumn(index, "width", Number(event.target.value))} />
                          </div>
                          <div className="space-y-2">
                            <Label>Align</Label>
                            <select
                              className={selectClassName}
                              value={column.align}
                              onChange={(event) => updateTableColumn(index, "align", event.target.value)}
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedElement.type === "attachmentGrid" && (
                <div className="space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Pengaturan Grid Lampiran
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Kategori</Label>
                      <select
                        className={selectClassName}
                        value={(selectedElement as PdfAttachmentGridElement).category}
                        onChange={(event) => updateSelectedElementField("category", event.target.value)}
                      >
                        <option value="produk">Produk</option>
                        <option value="pengujian">Pengujian</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fit</Label>
                      <select
                        className={selectClassName}
                        value={(selectedElement as PdfAttachmentGridElement).fit}
                        onChange={(event) => updateSelectedElementField("fit", event.target.value)}
                      >
                        <option value="contain">Contain</option>
                        <option value="cover">Cover</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Columns</Label>
                      <Input type="number" value={selectedElement.columns} onChange={(event) => updateSelectedElementField("columns", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Rows</Label>
                      <Input type="number" value={selectedElement.rows} onChange={(event) => updateSelectedElementField("rows", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Gap</Label>
                      <Input type="number" value={selectedElement.gap} onChange={(event) => updateSelectedElementField("gap", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Caption Font Size</Label>
                      <Input type="number" value={selectedElement.captionFontSize} onChange={(event) => updateSelectedElementField("captionFontSize", Number(event.target.value))} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Border Color</Label>
                      <Input value={selectedElement.borderColor} onChange={(event) => updateSelectedElementField("borderColor", event.target.value)} />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm dark:border-slate-700">
                    <input type="checkbox" checked={selectedElement.showCaptions} onChange={(event) => updateSelectedElementField("showCaptions", event.target.checked)} />
                    Tampilkan caption lampiran
                  </label>
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="space-y-4 border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <History className="h-4 w-4" />
            Riwayat Layout
          </div>

          <Button type="button" variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50" onClick={handleReset}>
            Reset ke Layout Default
          </Button>

          <div className="space-y-2">
            {history.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">
                Belum ada versi layout tersimpan.
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 px-4 py-4 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Versi {item.versionNumber}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleString("id-ID")}
                      </div>
                    </div>
                    {item.isPublish ? (
                      <div className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        Active
                      </div>
                    ) : (
                      <Button type="button" size="sm" variant="outline" onClick={() => handlePublishHistory(item.id)} disabled={isPublishingHistory === item.id}>
                        Jadikan Aktif
                      </Button>
                    )}
                  </div>
                  {item.notes ? (
                    <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      {item.notes}
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="button" variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              Simpan Draft
            </Button>
            <Button type="button" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => handleSave(true)} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              Simpan & Publish
            </Button>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden border-slate-200 bg-slate-100/80 shadow-sm dark:border-slate-800 dark:bg-[#0f111a]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/80">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Preview Layout
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Drag elemen untuk memindahkan, lalu tarik kotak sudut kanan bawah untuk ubah ukuran.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleUndo} disabled={undoStack.length === 0 || Boolean(dragState) || Boolean(resizeState)}>
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleRedo} disabled={redoStack.length === 0 || Boolean(dragState) || Boolean(resizeState)}>
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setScale((value) => Math.max(0.45, Number((value - 0.05).toFixed(2))))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="min-w-[66px] text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
              {Math.round(scale * 100)}%
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setScale((value) => Math.min(1.2, Number((value + 0.05).toFixed(2))))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-white/70 px-5 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
          Undo `Ctrl/Cmd + Z`, redo `Ctrl/Cmd + Y` atau `Ctrl/Cmd + Shift + Z`
        </div>

        <div className="overflow-auto p-5">
          {activePage ? (
            <div className="mx-auto min-w-max">
              <PdfLayoutPageRenderer
                layout={layout}
                data={previewData}
                pageId={activePage.id}
                scale={scale}
                selectedElementId={selectedElementId}
                showElementFrames
                onElementClick={(elementId) => setSelectedElementId(elementId)}
                onElementPointerDown={handlePointerDown}
                onElementResizePointerDown={handleResizePointerDown}
                className="bg-white"
              />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
