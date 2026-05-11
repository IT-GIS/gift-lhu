"use client";

import Link from "next/link";
import { Eye, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintActions({ id }: { id: string }) {
  const handleExportPDF = () => {
    const printWindow = window.open(`/lhu/${id}/print`, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleExportPDF}>
        <FileOutput className="mr-2 h-4 w-4" />
        Export PDF
      </Button>
      <Button variant="secondary" asChild>
        <Link href={`/lhu/${id}/print`} target="_blank">
          <Eye className="mr-2 h-4 w-4" />
          Preview Print
        </Link>
      </Button>
    </>
  );
}
