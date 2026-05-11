import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import type { LhuStatus } from "@/lib/db/queries/lhu";

const labels: Record<LhuStatus, string> = {
  draft: "Draft",
  input_hasil: "Input Hasil",
  review: "Review",
  revisi: "Revisi",
  approved: "Approved",
  published: "Published",
  revoked: "Revoked",
};

export function StatusBadge({ status }: { status: LhuStatus | string }) {
  const label = labels[status as LhuStatus] ?? status;
  const color = getStatusColor(status as LhuStatus);
  return <Badge className={color}>{label}</Badge>;
}

