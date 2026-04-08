import { NextResponse } from "next/server";
import { getLhuDocumentByToken } from "@/lib/db/queries/lhu";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const doc = await getLhuDocumentByToken(token);

  if (!doc) {
    return NextResponse.json(
      { status: "invalid", message: "Token not found or inactive" },
      { status: 404 }
    );
  }

  if (doc.status === "revoked") {
    return NextResponse.json({
      status: "revoked",
      lhuNumber: doc.lhuNumber,
      reason: doc.revokedReason,
      revokedAt: doc.revokedAt,
    });
  }

  if (doc.status !== "published") {
    return NextResponse.json(
      { status: "invalid", message: "Document is not published" },
      { status: 404 }
    );
  }

  // Only expose public-safe fields
  return NextResponse.json({
    status: "valid",
    lhuNumber: doc.lhuNumber,
    customer: doc.customer?.companyName ?? null,
    projectName: doc.projectName,
    testType: doc.testType,
    concreteType: doc.concreteType,
    publishedAt: doc.publishedAt,
    resultCount: doc.resultRows.length,
  });
}
