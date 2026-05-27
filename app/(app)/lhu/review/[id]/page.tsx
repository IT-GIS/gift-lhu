import { redirect } from "next/navigation";

export default async function ReviewDetailRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/lhu/${id}`);
}
