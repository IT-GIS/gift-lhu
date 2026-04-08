"use client";

import { QRCodeSVG } from "qrcode.react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import type {
  PdfAttachmentGridElement,
  PdfDynamicImageElement,
  PdfDynamicTextElement,
  PdfLayoutElement,
  PdfLayoutPage,
  PdfResultsTableElement,
  PdfStaticImageElement,
  PdfStaticTextElement,
  PdfTemplateLayoutMap,
} from "@/lib/pdf/lhu-template-default-map";
import type { PdfLayoutRenderData } from "@/lib/pdf/pdf-layout-render-data";

interface PdfLayoutPageRendererProps {
  layout: PdfTemplateLayoutMap;
  data: PdfLayoutRenderData;
  pageId: string;
  scale?: number;
  className?: string;
  selectedElementId?: string | null;
  showElementFrames?: boolean;
  onElementClick?: (elementId: string) => void;
  onElementPointerDown?: (
    event: ReactPointerEvent<HTMLDivElement>,
    element: PdfLayoutElement,
  ) => void;
  onElementResizePointerDown?: (
    event: ReactPointerEvent<HTMLDivElement>,
    element: PdfLayoutElement,
  ) => void;
}

function resolveTextContent(
  element: PdfStaticTextElement | PdfDynamicTextElement,
  data: PdfLayoutRenderData,
) {
  if (element.type === "staticText") return element.text;
  return data.textBindings[element.binding] || "";
}

function resolveImageContent(
  element: PdfStaticImageElement | PdfDynamicImageElement,
  data: PdfLayoutRenderData,
) {
  if (element.type === "staticImage") return element.src;
  return data.imageBindings[element.binding] || "";
}

function renderTextElement(
  element: PdfStaticTextElement | PdfDynamicTextElement,
  data: PdfLayoutRenderData,
) {
  const text = resolveTextContent(element, data);

  return (
    <div
      className="h-full w-full overflow-hidden whitespace-pre-wrap break-words"
      style={{
        color: element.color,
        fontSize: `${element.fontSize}px`,
        fontWeight: element.fontWeight === "bold" ? 700 : 400,
        lineHeight: String(element.lineHeight),
        textAlign: element.align,
      }}
    >
      {text}
    </div>
  );
}

function renderDynamicImage(
  element: PdfDynamicImageElement,
  data: PdfLayoutRenderData,
) {
  if (element.binding === "qrCode") {
    const size = Math.max(48, Math.min(element.width, element.height));

    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <QRCodeSVG value={data.qrValue || "https://example.com"} size={size} />
      </div>
    );
  }

  const src = resolveImageContent(element, data);
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
        {element.binding}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={element.name}
      className="h-full w-full"
      style={{ objectFit: element.fit }}
    />
  );
}

function renderStaticImage(element: PdfStaticImageElement) {
  if (!element.src) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
        image
      </div>
    );
  }

  return (
    <img
      src={element.src}
      alt={element.name}
      className="h-full w-full"
      style={{ objectFit: element.fit }}
    />
  );
}

function renderLineElement(element: PdfLayoutElement) {
  if (element.type !== "line") return null;

  const width = Math.max(Math.abs(element.width), element.strokeWidth);
  const height = Math.max(Math.abs(element.height), element.strokeWidth);
  const startX = element.width >= 0 ? 0 : width;
  const endX = element.width >= 0 ? width : 0;
  const startY = element.height >= 0 ? 0 : height;
  const endY = element.height >= 0 ? height : 0;

  return (
    <svg
      className="overflow-visible"
      width={width}
      height={height || element.strokeWidth}
      viewBox={`0 0 ${width || 1} ${height || element.strokeWidth}`}
      preserveAspectRatio="none"
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX || width}
        y2={endY || startY}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </svg>
  );
}

function renderResultsTable(
  element: PdfResultsTableElement,
  data: PdfLayoutRenderData,
) {
  const rows = data.resultsTableRows.slice(0, element.maxRows);
  const totalColumnWidth =
    element.columns.reduce((sum, column) => sum + column.width, 0) || 1;
  const gridTemplateColumns = element.columns
    .map((column) => `${(column.width / totalColumnWidth) * 100}%`)
    .join(" ");
  const borderStyle = element.showGrid ? `1px solid ${element.borderColor}` : "none";

  return (
    <div
      className="h-full w-full overflow-hidden"
      style={{
        color: element.textColor,
        fontSize: `${element.fontSize}px`,
      }}
    >
      {element.showHeader && (
        <div
          className="grid"
          style={{
            gridTemplateColumns,
            minHeight: `${element.headerHeight}px`,
            backgroundColor: element.headerFillColor,
            border: borderStyle,
            borderBottom: borderStyle,
          }}
        >
          {element.columns.map((column, index) => (
            <div
              key={column.id}
              className="flex items-center px-2 text-center font-semibold"
              style={{
                justifyContent:
                  column.align === "right"
                    ? "flex-end"
                    : column.align === "center"
                      ? "center"
                      : "flex-start",
                borderRight:
                  element.showGrid && index < element.columns.length - 1
                    ? `1px solid ${element.borderColor}`
                    : "none",
                fontSize: `${element.headerFontSize}px`,
              }}
            >
              {column.label}
            </div>
          ))}
        </div>
      )}

      <div className="flex h-full flex-col">
        {rows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid"
            style={{
              gridTemplateColumns,
              minHeight: `${element.rowHeight}px`,
              borderLeft: borderStyle,
              borderRight: borderStyle,
              borderBottom: borderStyle,
            }}
          >
            {element.columns.map((column, columnIndex) => (
              <div
                key={column.id}
                className="flex items-center whitespace-pre-wrap break-words px-2"
                style={{
                  justifyContent:
                    column.align === "right"
                      ? "flex-end"
                      : column.align === "center"
                        ? "center"
                        : "flex-start",
                  textAlign: column.align,
                  borderRight:
                    element.showGrid && columnIndex < element.columns.length - 1
                      ? `1px solid ${element.borderColor}`
                      : "none",
                }}
              >
                {row[column.valueKey] || ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderAttachmentGrid(
  element: PdfAttachmentGridElement,
  data: PdfLayoutRenderData,
) {
  const slots = element.columns * element.rows;
  const items = data.attachmentBindings[element.category].slice(0, slots);
  const totalGapHeight = element.gap * Math.max(0, element.rows - 1);
  const cellHeight = (element.height - totalGapHeight) / Math.max(element.rows, 1);

  return (
    <div
      className="grid h-full w-full"
      style={{
        gridTemplateColumns: `repeat(${element.columns}, minmax(0, 1fr))`,
        gap: `${element.gap}px`,
      }}
    >
      {Array.from({ length: slots }).map((_, index) => {
        const item = items[index];

        return (
          <div
            key={`${element.id}-${index}`}
            className="flex flex-col overflow-hidden rounded-sm"
            style={{
              minHeight: `${cellHeight}px`,
              border: `1px solid ${element.borderColor}`,
            }}
          >
            <div className="relative flex-1 bg-slate-50">
              {item?.src ? (
                <img
                  src={item.src}
                  alt={item.caption}
                  className="h-full w-full"
                  style={{ objectFit: element.fit }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  image
                </div>
              )}
            </div>
            {element.showCaptions && (
              <div
                className="border-t border-slate-200 px-2 py-1 text-center text-slate-600"
                style={{ fontSize: `${element.captionFontSize}px` }}
              >
                {item?.caption || `Lampiran ${index + 1}`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function renderElement(
  element: PdfLayoutElement,
  data: PdfLayoutRenderData,
) {
  switch (element.type) {
    case "staticText":
    case "dynamicText":
      return renderTextElement(element, data);
    case "staticImage":
      return renderStaticImage(element);
    case "dynamicImage":
      return renderDynamicImage(element, data);
    case "line":
      return renderLineElement(element);
    case "resultsTable":
      return renderResultsTable(element, data);
    case "attachmentGrid":
      return renderAttachmentGrid(element, data);
  }
}

function getElementFrameStyles(element: PdfLayoutElement): CSSProperties {
  const width = Math.abs(element.width);
  const height =
    element.type === "line"
      ? Math.max(Math.abs(element.height), element.strokeWidth)
      : Math.abs(element.height);

  return {
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${Math.max(width, 1)}px`,
    height: `${Math.max(height, 1)}px`,
    opacity: element.opacity,
    zIndex: element.zIndex,
  };
}

function getPage(layout: PdfTemplateLayoutMap, pageId: string) {
  return layout.pages.find((page) => page.id === pageId);
}

function getPageElements(layout: PdfTemplateLayoutMap, pageId: string) {
  return layout.elements
    .filter((element) => element.pageId === pageId && element.visible)
    .sort((first, second) => first.zIndex - second.zIndex);
}

function PageShell({
  page,
  children,
}: {
  page: PdfLayoutPage;
  children: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: `${page.width}px`,
        height: `${page.height}px`,
        backgroundColor: page.backgroundColor,
      }}
    >
      {page.backgroundSrc ? (
        <img
          src={page.backgroundSrc}
          alt={page.name}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : null}
      {children}
    </div>
  );
}

export function PdfLayoutPageRenderer({
  layout,
  data,
  pageId,
  scale = 1,
  className,
  selectedElementId,
  showElementFrames = false,
  onElementClick,
  onElementPointerDown,
  onElementResizePointerDown,
}: PdfLayoutPageRendererProps) {
  const page = getPage(layout, pageId);
  if (!page) return null;

  const elements = getPageElements(layout, pageId);

  return (
    <div
      className={cn("relative overflow-hidden rounded-[24px] bg-white shadow-2xl", className)}
      style={{
        width: `${page.width * scale}px`,
        height: `${page.height * scale}px`,
      }}
    >
      <div
        style={{
          width: `${page.width}px`,
          height: `${page.height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <PageShell page={page}>
          {elements.map((element) => {
            const isSelected = selectedElementId === element.id;

            return (
              <div
                key={element.id}
                className={cn(
                  "absolute",
                  showElementFrames
                    ? "cursor-move rounded-sm border border-dashed border-sky-400/70 bg-sky-100/10"
                    : "",
                  isSelected ? "ring-2 ring-indigo-500 ring-offset-1 ring-offset-white" : "",
                )}
                style={getElementFrameStyles(element)}
                onClick={(event) => {
                  event.stopPropagation();
                  onElementClick?.(element.id);
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                  onElementPointerDown?.(event, element);
                }}
              >
                {renderElement(element, data)}
                {showElementFrames &&
                isSelected &&
                element.type !== "line" &&
                onElementResizePointerDown ? (
                  <div
                    className="absolute bottom-[-7px] right-[-7px] h-4 w-4 cursor-se-resize rounded-sm border border-white bg-indigo-500 shadow"
                    onClick={(event) => event.stopPropagation()}
                    onPointerDown={(event) => {
                      event.stopPropagation();
                      onElementResizePointerDown(event, element);
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </PageShell>
      </div>
    </div>
  );
}

export function PdfLayoutDocumentRenderer({
  layout,
  data,
  scale = 1,
  className,
  pageClassName,
}: {
  layout: PdfTemplateLayoutMap;
  data: PdfLayoutRenderData;
  scale?: number;
  className?: string;
  pageClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {layout.pages.map((page) => (
        <PdfLayoutPageRenderer
          key={page.id}
          layout={layout}
          data={data}
          pageId={page.id}
          scale={scale}
          className={pageClassName}
        />
      ))}
    </div>
  );
}
