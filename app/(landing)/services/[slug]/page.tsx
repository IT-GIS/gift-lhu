import { notFound } from "next/navigation";
import { ServiceDetailLandingPage } from "@/components/landing/wp-landing";
import { getServiceBySlug, serviceSlugs } from "@/components/landing/landing-data";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getServiceBySlug(slug);

  if (!found) {
    return { title: "Layanan Tidak Ditemukan | GIFT Laboratory" };
  }

  return { title: `${found.service.title} | GIFT Laboratory` };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getServiceBySlug(slug);

  if (!found) {
    notFound();
  }

  return <ServiceDetailLandingPage slug={slug} image={found.image} />;
}
