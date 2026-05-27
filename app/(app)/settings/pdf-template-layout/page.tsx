import { redirect } from "next/navigation";

export default function PdfLayoutRedirectPage() {
  redirect("/settings");
}
