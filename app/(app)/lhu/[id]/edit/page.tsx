import { notFound } from "next/navigation";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { EditLhuForm } from "./edit-lhu-form";

export default async function EditLhuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getLhuDocumentById(id);
  if (!doc) return notFound();

  return <EditLhuForm doc={doc} />;
}
