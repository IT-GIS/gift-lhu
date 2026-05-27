import { inflateSync } from "zlib";

export interface ImportedLhuRow {
  id: string;
  kodeSampel: string;
  tanggalBuat: string;
  tanggalTest: string;
  berat: string;
  umur: string;
  ukuran: string;
  tekananMaksimum: string;
  teganganHancurMpa: string;
  teganganHancurOther: string;
  konversiTeganganHancurKubus: string;
  polaHancur: string;
  keterangan: string;
}

export interface ImportedLhuPdfData {
  customer?: string;
  projectAddress?: string;
  projectName?: string;
  referenceNumber?: string;
  concreteType?: string;
  testType?: string;
  sampleCount?: string;
  receivedDate?: string;
  testingDate?: string;
  analystName?: string;
  rows: ImportedLhuRow[];
  extractedText: string;
}

interface TextItem {
  text: string;
  x: number;
  y: number;
}

const MONTHS: Record<string, string> = {
  januari: "01",
  january: "01",
  februari: "02",
  february: "02",
  maret: "03",
  march: "03",
  april: "04",
  mei: "05",
  may: "05",
  juni: "06",
  june: "06",
  juli: "07",
  july: "07",
  agustus: "08",
  august: "08",
  september: "09",
  oktober: "10",
  october: "10",
  november: "11",
  desember: "12",
  december: "12",
};

function decodePdfString(value: string) {
  let output = "";

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (char !== "\\") {
      output += char;
      continue;
    }

    const next = value[++index];
    if (!next) continue;

    if (next === "n") output += "\n";
    else if (next === "r") output += "\r";
    else if (next === "t") output += "\t";
    else if (next === "b") output += "\b";
    else if (next === "f") output += "\f";
    else if (next === "(" || next === ")" || next === "\\") output += next;
    else if (/[0-7]/.test(next)) {
      let octal = next;
      for (let count = 0; count < 2 && /[0-7]/.test(value[index + 1] || ""); count += 1) {
        octal += value[++index];
      }
      output += String.fromCharCode(parseInt(octal, 8));
    } else {
      output += next;
    }
  }

  return output;
}

function decodeHexString(hex: string) {
  const bytes = hex.replace(/\s+/g, "");
  if (!bytes) return "";

  const buffer = Buffer.from(bytes.length % 2 === 0 ? bytes : `${bytes}0`, "hex");
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    let value = "";
    for (let index = 2; index + 1 < buffer.length; index += 2) {
      value += String.fromCharCode(buffer.readUInt16BE(index));
    }
    return value;
  }

  return buffer.toString("latin1");
}

function readLiteralStrings(value: string) {
  const strings: string[] = [];
  const regex = /\((?:\\.|[^\\)])*\)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(value))) {
    strings.push(decodePdfString(match[0].slice(1, -1)));
  }

  return strings;
}

function textFromOperator(operator: string) {
  const tj = operator.match(/^\(([\s\S]*)\)\s*Tj$/);
  if (tj) return decodePdfString(tj[1]);

  const hex = operator.match(/^<([0-9A-Fa-f\s]+)>\s*Tj$/);
  if (hex) return decodeHexString(hex[1]);

  const array = operator.match(/^\[([\s\S]*)\]\s*TJ$/);
  if (!array) return "";

  const literalText = readLiteralStrings(array[1]).join("");
  if (literalText) return literalText;

  const hexStrings = [...array[1].matchAll(/<([0-9A-Fa-f\s]+)>/g)].map((match) =>
    decodeHexString(match[1])
  );
  return hexStrings.join("");
}

function parseTextItems(content: string) {
  const items: TextItem[] = [];
  let x = 0;
  let y = 0;

  const operatorRegex =
    /BT|ET|-?\d*\.?\d+\s+-?\d*\.?\d+\s+-?\d*\.?\d+\s+-?\d*\.?\d+\s+(-?\d*\.?\d+)\s+(-?\d*\.?\d+)\s+Tm|(-?\d*\.?\d+)\s+(-?\d*\.?\d+)\s+Td|\((?:\\.|[^\\)])*\)\s*Tj|<[\dA-Fa-f\s]+>\s*Tj|\[(?:\s*(?:\((?:\\.|[^\\)])*\)|<[\dA-Fa-f\s]+>|[-+]?\d*\.?\d+)\s*)*\]\s*TJ/g;

  let match: RegExpExecArray | null;
  while ((match = operatorRegex.exec(content))) {
    const operator = match[0];

    if (operator === "BT") {
      x = 0;
      y = 0;
      continue;
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      x = Number(match[1]);
      y = Number(match[2]);
      continue;
    }

    if (match[3] !== undefined && match[4] !== undefined) {
      x += Number(match[3]);
      y += Number(match[4]);
      continue;
    }

    if (operator.endsWith("Tj") || operator.endsWith("TJ")) {
      const text = textFromOperator(operator).replace(/\s+/g, " ").trim();
      if (text) {
        items.push({ text, x, y });
        x += text.length * 4.8;
      }
    }
  }

  return items;
}

function decodedPdfStreams(buffer: Buffer) {
  const latin = buffer.toString("latin1");
  const streams: string[] = [];
  const streamRegex = /<<(.*?)>>\s*stream\r?\n/g;
  let match: RegExpExecArray | null;

  while ((match = streamRegex.exec(latin))) {
    const dictionary = match[1];
    const start = match.index + match[0].length;
    const end = latin.indexOf("endstream", start);
    if (end < 0) continue;

    let rawEnd = end;
    if (latin[rawEnd - 1] === "\n") rawEnd -= 1;
    if (latin[rawEnd - 1] === "\r") rawEnd -= 1;

    const raw = buffer.subarray(start, rawEnd);
    let decoded = raw;

    if (/\/FlateDecode/.test(dictionary)) {
      try {
        decoded = inflateSync(raw);
      } catch {
        continue;
      }
    }

    const content = decoded.toString("latin1");
    if (content.includes("BT") && content.includes("ET")) {
      streams.push(content);
    }

    streamRegex.lastIndex = end + "endstream".length;
  }

  return streams;
}

export function extractPdfDctImages(buffer: Buffer) {
  const latin = buffer.toString("latin1");
  const images: Buffer[] = [];
  const streamRegex = /<<(.*?)>>\s*stream\r?\n/g;
  let match: RegExpExecArray | null;

  while ((match = streamRegex.exec(latin))) {
    const dictionary = match[1];
    const start = match.index + match[0].length;
    const end = latin.indexOf("endstream", start);
    if (end < 0) continue;

    let rawEnd = end;
    if (latin[rawEnd - 1] === "\n") rawEnd -= 1;
    if (latin[rawEnd - 1] === "\r") rawEnd -= 1;

    if (/\/Subtype\s*\/Image/.test(dictionary) && /\/DCTDecode/.test(dictionary)) {
      images.push(buffer.subarray(start, rawEnd));
    }

    streamRegex.lastIndex = end + "endstream".length;
  }

  return images;
}

function buildLines(items: TextItem[]) {
  const sorted = [...items].sort((a, b) => {
    const yDiff = b.y - a.y;
    if (Math.abs(yDiff) > 2.5) return yDiff;
    return a.x - b.x;
  });

  const lines: Array<{ y: number; items: TextItem[] }> = [];

  for (const item of sorted) {
    const line = lines.find((candidate) => Math.abs(candidate.y - item.y) <= 2.5);
    if (line) {
      line.items.push(item);
      line.y = (line.y + item.y) / 2;
    } else {
      lines.push({ y: item.y, items: [item] });
    }
  }

  return lines
    .map((line) =>
      line.items
        .sort((a, b) => a.x - b.x)
        .map((item) => item.text)
        .join(" ")
        .replace(/\s+([:;,.)/])/g, "$1")
        .replace(/([(/])\s+/g, "$1")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);
}

export function extractPdfText(buffer: Buffer) {
  const lines: string[] = [];

  for (const stream of decodedPdfStreams(buffer)) {
    const items = parseTextItems(stream);
    lines.push(...buildLines(items));
  }

  return lines.join("\n");
}

function cleanValue(value?: string) {
  if (!value) return "";

  const cleaned = value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line !== ":" && !/^[IVX]+\.$/i.test(line))
    .join(" ")
    .replace(/\s+([:;,.)/])/g, "$1")
    .replace(/([(/])\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  return /^[-_\s]+$/.test(cleaned) ? "" : cleaned;
}

function extractBlock(text: string, label: string, nextLabels: string[]) {
  const next = nextLabels.map((item) => `(?:${item})[ \\t]*:?`).join("|");
  const regex = new RegExp(`(?:${label})[ \\t]*:?[ \\t]*([\\s\\S]*?)(?=\\n\\s*(?:${next})|$)`, "i");
  const match = text.match(regex);
  return cleanValue(match?.[1]);
}

function extractOcrFieldSequence(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  const reportMatch = compact.match(/REPORT OF ANALYSIS\s+([A-Z0-9/-]+)\s+([\s\S]*?)(?=\s+sampel\s+1\s+|\s+No\.?\s+|$)/i);
  if (!reportMatch) return null;

  const referenceNumber = cleanValue(reportMatch[1]);
  let remainder = reportMatch[2]
    .replace(/\bNo\.?\s*Pengujian\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const methodMatch = remainder.match(/\bSNI\s*\d{3,5}\s*:\s*\d{4}\b/i);
  const testType = cleanValue(methodMatch?.[0]);
  const methodIndex = methodMatch?.index ?? -1;

  if (methodIndex < 0) return { referenceNumber, testType };

  const beforeMethod = remainder.slice(0, methodIndex).trim();
  const afterMethod = remainder.slice(methodIndex + methodMatch![0].length).trim();
  const addressMarker = beforeMethod.search(/\s+(?:Jl\.?|Jalan|Komplek|Kawasan|Desa|Klari|Karawang)\b/i);
  const firstNumber = beforeMethod.search(/\d/);
  const splitIndex = addressMarker >= 0 ? addressMarker : firstNumber;
  const customer = cleanValue(splitIndex >= 0 ? beforeMethod.slice(0, splitIndex) : beforeMethod);
  const projectAddress = cleanValue(splitIndex >= 0 ? beforeMethod.slice(splitIndex) : "");
  const sampleMatch = afterMethod.match(/(\d+)\s*(?:Buah|Benda|Sampel|Sample)?\s+(.+)$/i);

  return {
    customer,
    projectAddress,
    projectName: referenceNumber,
    referenceNumber,
    testType,
    sampleCount: sampleMatch ? sampleMatch[1] : "",
    tail: sampleMatch ? sampleMatch[2] : afterMethod,
  };
}

function toDateInput(value?: string) {
  const cleaned = cleanValue(value);
  if (!cleaned) return "";

  const iso = cleaned.match(/\b(20\d{2}|19\d{2})[-/](\d{1,2})[-/](\d{1,2})\b/);
  if (iso) {
    return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  }

  const numeric = cleaned.match(/\b(\d{1,2})[-/](\d{1,2})[-/](20\d{2}|19\d{2}|\d{2})\b/);
  if (numeric) {
    const year = numeric[3].length === 2 ? `20${numeric[3]}` : numeric[3];
    return `${year}-${numeric[2].padStart(2, "0")}-${numeric[1].padStart(2, "0")}`;
  }

  const named = cleaned.match(/\b(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(20\d{2}|19\d{2})\b/i);
  if (named) {
    const month = MONTHS[named[2].toLowerCase()];
    if (month) return `${named[3]}-${month}-${named[1].padStart(2, "0")}`;
  }

  return "";
}

function readDateFromTokens(tokens: string[]) {
  if (tokens.length === 0) return "";

  const numeric = tokens[0]?.match(/^(\d{1,2})[-/](\d{1,2})[-/](20\d{2}|19\d{2}|\d{2})$/);
  if (numeric) {
    tokens.shift();
    return toDateInput(numeric[0]);
  }

  const iso = tokens[0]?.match(/^(20\d{2}|19\d{2})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (iso) {
    tokens.shift();
    return toDateInput(iso[0]);
  }

  if (tokens.length >= 3 && /^\d{1,2}$/.test(tokens[0]) && MONTHS[tokens[1].toLowerCase()] && /^(20\d{2}|19\d{2})$/.test(tokens[2])) {
    const value = `${tokens[0]} ${tokens[1]} ${tokens[2]}`;
    tokens.splice(0, 3);
    return toDateInput(value);
  }

  return "";
}

function normalizeNumber(value?: string) {
  return (value || "").replace(",", ".").replace(/[^\d.-]/g, "");
}

function normalizeSampleCount(value?: string) {
  const cleaned = cleanValue(value);
  const spacedDigits = cleaned.match(/(\d(?:\s*\d)*)\s*(?:Buah|Benda|Sampel|Sample)?/i)?.[1];
  if (spacedDigits) return spacedDigits.replace(/\s+/g, "");
  return cleaned.match(/\d+/)?.[0] || "";
}

function parseTableRows(text: string): ImportedLhuRow[] {
  const tableStart = text.search(/\bKode\b[\s\S]{0,240}\b(?:sampel|sample)\b/i);
  const analystStart = text.search(/\n\s*Analis\s*:/i);
  if (tableStart < 0 || analystStart < 0 || analystStart <= tableStart) return [];

  const tableText = text.slice(tableStart, analystStart);
  const rows: ImportedLhuRow[] = [];

  for (const rawLine of tableText.split("\n")) {
    const line = rawLine
      .replace(/[×✕]/g, "x")
      .replace(/[^\x20-\x7EÀ-ÿ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!/^\d{1,3}\s+/.test(line)) continue;

    const rowMatch = line.match(
      /^\d{1,3}\s+(\S+)\s+(\d{2}\/\d{2}\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})\s+([\d.,]+)\s+(\d+)\s+(\d{2,3})\s*x?\s*(\d{2,3})\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+(\S+)\s*(.*)$/i
    );

    if (rowMatch) {
      rows.push({
        id: `imported-row-${Date.now()}-${rows.length}`,
        kodeSampel: normalizeSampleCode(rowMatch[1]),
        tanggalBuat: toDateInput(rowMatch[2]),
        tanggalTest: toDateInput(rowMatch[3]),
        berat: normalizeNumber(rowMatch[4]),
        umur: rowMatch[5],
        ukuran: `${rowMatch[6]} x ${rowMatch[7]}`,
        tekananMaksimum: normalizeNumber(rowMatch[8]),
        teganganHancurMpa: normalizeNumber(rowMatch[9]),
        teganganHancurOther: normalizeNumber(rowMatch[10]),
        konversiTeganganHancurKubus: normalizeNumber(rowMatch[11]),
        polaHancur: rowMatch[12],
        keterangan: rowMatch[13],
      });
      continue;
    }

    const tokens = line.split(/\s+/);
    tokens.shift();
    const kodeSampel = tokens.shift() || "";
    const tanggalBuat = readDateFromTokens(tokens);
    const tanggalTest = readDateFromTokens(tokens);

    if (!kodeSampel || (!tanggalBuat && !tanggalTest && tokens.length < 6)) continue;

    rows.push({
      id: `imported-row-${Date.now()}-${rows.length}`,
      kodeSampel,
      tanggalBuat,
      tanggalTest,
      berat: normalizeNumber(tokens.shift()),
      umur: normalizeNumber(tokens.shift()),
      ukuran: tokens.shift() || "",
      tekananMaksimum: normalizeNumber(tokens.shift()),
      teganganHancurMpa: normalizeNumber(tokens.shift()),
      teganganHancurOther: normalizeNumber(tokens.shift()),
      konversiTeganganHancurKubus: normalizeNumber(tokens.shift()),
      polaHancur: tokens.shift() || "",
      keterangan: tokens.join(" "),
    });
  }

  return rows;
}

function normalizeSampleCode(value: string) {
  const upper = value
    .toUpperCase()
    .replace(/\)/g, "D")
    .replace(/[!|]/g, "I")
    .replace(/^SLN/, "SLDR-")
    .replace(/^SLDR(\d)/, "SLDR-$1");
  const prefixMatch = upper.match(/^(SLDR)-?(.+)$/);
  if (!prefixMatch) return upper;

  const numericPart = prefixMatch[2].replace(/[OQC]/g, "0").replace(/I/g, "1");
  const match = numericPart.match(/^([0-9]+)-?([0-9]+)$/);
  if (!match) return upper;

  const middle = match[1].padStart(4, "0");
  return `${prefixMatch[1]}-${middle}-${match[2]}`;
}

function parseOcrTableRows(text: string, expectedCount = 0): ImportedLhuRow[] {
  const compact = text.replace(/\s+/g, " ").trim();
  const sampleSection = compact.match(/\bsampel\s+(.+?)\s+Analis\s*:/i)?.[1] || compact;
  const sampleMap = new Map<number, string>();
  for (const match of sampleSection.matchAll(/(?:^|\s)(\d{1,2})\s+([A-Z0-9)'!-]{3,}(?:-[A-Z0-9)'!-]+)?)/gi)) {
    sampleMap.set(Number(match[1]), normalizeSampleCode(match[2]));
  }
  for (const match of sampleSection.matchAll(/([A-Z]{2,}[A-Z0-9)'!-]{2,}(?:-[A-Z0-9)'!-]+)?)\s+(\d{1,2})(?=\s|$)/gi)) {
    const rowNumber = Number(match[2]);
    if (!sampleMap.has(rowNumber)) sampleMap.set(rowNumber, normalizeSampleCode(match[1]));
  }

  const sampleCodes = [...sampleMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map((entry) => entry[1])
    .slice(0, expectedCount || undefined);
  if (sampleCodes.length === 0) return [];
  const rowCount = expectedCount || sampleCodes.length;
  const dateMatches = [...compact.matchAll(/\b\d{2}\/\d{2}\/\d{4}\b/g)].map((match) => match[0]);
  const numericMatches = [...compact.matchAll(/\b\d{1,4}[.,]\d{1,3}\b/g)].map((match) => match[0]);
  const remarks = [...compact.matchAll(/\bK[- ]?\d{3}\b/gi)].map((match) =>
    match[0].replace(/\s+/g, "").toUpperCase()
  );
  const failurePatterns = [...compact.matchAll(/\bcol(?:u|!|')?m(?:n|r)?ar\b/gi)].map(() => "columnar");

  const castingDates = dateMatches.slice(0, rowCount).map(toDateInput);
  const testingDates = dateMatches.slice(rowCount, rowCount * 2).map(toDateInput);
  const weights = numericMatches.slice(0, rowCount).map(normalizeNumber);
  const maxLoads = numericMatches.slice(rowCount, rowCount * 2).map(normalizeNumber);
  const strengthsMpa = numericMatches.slice(rowCount * 2, rowCount * 3).map(normalizeNumber);
  const strengthsKg = numericMatches.slice(rowCount * 3, rowCount * 4).map(normalizeNumber);
  const cubeStrengths = numericMatches.slice(rowCount * 4, rowCount * 5).map(normalizeNumber);
  const ageMatch = compact.match(/\(Hari\)\s+((?:\d+\s+){3,}\d+)/i);
  const ages = ageMatch ? ageMatch[1].trim().split(/\s+/) : [];
  const dimensionMatches = [...compact.matchAll(/\b\d{2,3}\s*x\s*\d{2,3}\b/gi)].map((match) =>
    match[0].replace(/\s+/g, " ")
  );

  return sampleCodes.map((sampleCode, index) => ({
    id: `imported-ocr-row-${Date.now()}-${index}`,
    kodeSampel: sampleCode,
    tanggalBuat: castingDates[index] || "",
    tanggalTest: testingDates[index] || "",
    berat: weights[index] || "",
    umur: ages[index] || ages[0] || "",
    ukuran: dimensionMatches[index] || dimensionMatches[0] || "",
    tekananMaksimum: maxLoads[index] || "",
    teganganHancurMpa: strengthsMpa[index] || "",
    teganganHancurOther: strengthsKg[index] || "",
    konversiTeganganHancurKubus: cubeStrengths[index] || "",
    polaHancur: failurePatterns[index] || failurePatterns[0] || "",
    keterangan: remarks[index] || "",
  }));
}

function extractReferenceNumber(text: string) {
  const compact = text
    .replace(/\n+/g, " ")
    .replace(/\s+([/-])/g, "$1")
    .replace(/([/-])\s+/g, "$1")
    .replace(/\s+/g, " ");

  const reportMatch = compact.match(/REPORT OF ANALYSIS\s+([A-Z0-9/-]{6,})/i);
  if (reportMatch) return reportMatch[1];

  return compact.match(/\b\d{3,5}\/GIFT\/[A-Z0-9/-]+\/20\d{2}\b/i)?.[0] || "";
}

function inferConcreteType(text: string) {
  if (/kubus/i.test(text)) return "kubus";
  if (/silinder/i.test(text)) return "silinder";
  return "";
}

function focusFormToTableText(text: string) {
  const startMatch = text.match(/(?:I\.\s*)?Nama\s+Pelanggan/i);
  if (!startMatch || startMatch.index === undefined) return text;

  const start = startMatch.index;
  const afterStart = text.slice(start);
  const analystMatch = afterStart.match(/\n\s*Analis\s*:/i);
  if (analystMatch?.index !== undefined) {
    const nextFooter = afterStart
      .slice(analystMatch.index + analystMatch[0].length)
      .search(/\n\s*(?:PT\.?\s+GLOBAL|GIFT|GI\s*FT|LP\s*-|Page\s+\d+)/i);
    if (nextFooter >= 0) {
      return afterStart.slice(0, analystMatch.index + analystMatch[0].length + nextFooter);
    }
  }

  const attachmentStart = afterStart.search(/\n\s*(?:LAMPIRAN|LAM\s*PIRA\s*N|Gambar\s+Produk)/i);
  if (attachmentStart > 0) return afterStart.slice(0, attachmentStart);

  return afterStart;
}

function emptyRowsFromSampleCount(sampleCount: string) {
  const count = Math.max(0, Math.min(50, Number(sampleCount.match(/\d+/)?.[0] || 0)));
  return Array.from({ length: count }, (_, index) => ({
    id: `imported-${Date.now()}-${index}`,
    kodeSampel: "",
    tanggalBuat: "",
    tanggalTest: "",
    berat: "",
    umur: "",
    ukuran: "",
    tekananMaksimum: "",
    teganganHancurMpa: "",
    teganganHancurOther: "",
    konversiTeganganHancurKubus: "",
    polaHancur: "",
    keterangan: "",
  }));
}

export function parseLhuPdfText(text: string): ImportedLhuPdfData {
  const focusedText = focusFormToTableText(text);
  const ocrSequence = extractOcrFieldSequence(focusedText) || extractOcrFieldSequence(text);
  const labels = {
    customer: String.raw`(?:I\.\s*)?Nama\s+Pelanggan`,
    address: String.raw`(?:[IVX]+\.\s*)?Alamat`,
    method: String.raw`(?:[IVX]+\.\s*)?Metode\s+Uji`,
    testNumber: String.raw`(?:[IVX]+\.\s*)?No\.?\s*Pengujian`,
    sampleCount: String.raw`(?:[IVX]+\.\s*)?Jumlah\s+Contoh`,
    receivedDate: String.raw`(?:[IVX]+\.\s*)?Terima\s+Tanggal`,
    testingDate: String.raw`(?:[IVX]+\.\s*)?Diuji\s+Tanggal`,
    analyst: String.raw`Analis`,
  };

  const orderedLabels = [
    labels.customer,
    labels.address,
    labels.method,
    labels.testNumber,
    labels.sampleCount,
    labels.receivedDate,
    labels.testingDate,
    labels.analyst,
    String.raw`Tangerang`,
    String.raw`PT\.?\s+Global`,
    String.raw`LP\s*-`,
  ];

  const customer = extractBlock(focusedText, labels.customer, orderedLabels.slice(1));
  const projectAddress = extractBlock(focusedText, labels.address, orderedLabels.slice(2));
  const method = extractBlock(focusedText, labels.method, orderedLabels.slice(3));
  const titleAcuan = cleanValue(text.match(/\(\s*Acuan\s*:?\s*([^)]+)\)/i)?.[1]);
  const projectName = extractBlock(focusedText, labels.testNumber, orderedLabels.slice(4));
  const sampleCount = extractBlock(focusedText, labels.sampleCount, orderedLabels.slice(5));
  const receivedRaw = extractBlock(focusedText, labels.receivedDate, orderedLabels.slice(6));
  const testingRaw = extractBlock(focusedText, labels.testingDate, orderedLabels.slice(7));
  const analystName = extractBlock(focusedText, labels.analyst, [
    String.raw`PT\.?\s+GLOBAL`,
    String.raw`GIFT`,
    String.raw`GI\s*FT`,
    String.raw`LP\s*-`,
  ]);
  const rows = parseTableRows(focusedText);
  const sampleCountFromOcr = normalizeSampleCount(ocrSequence?.sampleCount);
  const normalizedSampleCount = normalizeSampleCount(sampleCount);
  const expectedOcrRows = Number(sampleCountFromOcr || normalizedSampleCount || 0);
  const ocrRows = rows.length > 0 ? rows : parseOcrTableRows(focusedText, expectedOcrRows);
  const titleConcreteType = inferConcreteType(text);
  const titleTestType = cleanValue(
    text.match(/LAPORAN\s+HASIL\s+PENGUJIAN\s+(.+?)(?:\s+Akr|\s+\(Acuan|\s+REPORT|$)/i)?.[1]
  );
  const receivedFromOcrTail = ocrSequence?.tail
    ? toDateInput(ocrSequence.tail.match(/\b\d{1,2}\s+[A-Za-zÀ-ÿ]+\s+\d{4}\b/)?.[0])
    : "";
  const testingFromOcrTail = ocrSequence?.tail
    ? toDateInput([...ocrSequence.tail.matchAll(/\b\d{1,2}\s+[A-Za-zÀ-ÿ]+\s+\d{4}\b/g)][1]?.[0])
    : "";

  const ocrAnalyst = cleanValue(focusedText.match(/\bAnalis\s*:?\s+(.+?)\s+Tan\s+Buat\b/i)?.[1]);
  const useOcrSequence = Boolean(ocrSequence?.referenceNumber);

  return {
    customer: (useOcrSequence ? ocrSequence?.customer : customer) || customer || "",
    projectAddress: (useOcrSequence ? ocrSequence?.projectAddress : projectAddress) || projectAddress || "",
    projectName: (useOcrSequence ? ocrSequence?.projectName : projectName) || projectName || "",
    referenceNumber: extractReferenceNumber(text) || ocrSequence?.referenceNumber || "",
    concreteType: titleConcreteType,
    testType: (useOcrSequence ? ocrSequence?.testType : method) || method || titleAcuan || titleTestType,
    sampleCount: (useOcrSequence ? sampleCountFromOcr : normalizedSampleCount) || normalizedSampleCount || "",
    receivedDate: (useOcrSequence ? receivedFromOcrTail : toDateInput(receivedRaw)) || toDateInput(receivedRaw),
    testingDate: (useOcrSequence ? testingFromOcrTail : toDateInput(testingRaw)) || toDateInput(testingRaw),
    analystName: ocrAnalyst || analystName,
    rows: ocrRows.length > 0 ? ocrRows : emptyRowsFromSampleCount(normalizedSampleCount || sampleCountFromOcr),
    extractedText: focusedText,
  };
}
