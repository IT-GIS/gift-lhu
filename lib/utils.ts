import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: string | Date | null) {
  if (!date) return "-";
  const parsed = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function formatNumber(value?: number | null, fractionDigits = 2) {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function getConcreteTypeLabel(value: "silinder" | "kubus") {
  return value === "silinder" ? "Beton Silinder" : "Beton Kubus";
}

export function getStatusColor(
  status:
    | "draft"
    | "input_hasil"
    | "review"
    | "revisi"
    | "approved"
    | "published"
    | "revoked"
) {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "input_hasil":
      return "bg-secondary text-secondary-foreground";
    case "review":
      return "bg-accent text-accent-foreground";
    case "revisi":
      return "bg-warning text-warning-foreground";
    case "approved":
      return "bg-success/15 text-success";
    case "published":
      return "bg-primary/15 text-primary";
    case "revoked":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}
