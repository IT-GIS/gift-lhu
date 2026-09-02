import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { dictionary, type LandingDictionary, type Locale } from "./i18n/dictionary";

type NavChild = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

export function getNavItems(t: LandingDictionary): NavItem[] {
  return [
    { label: t.nav.home, href: "/" },
    { label: t.nav.profile, href: "/profile" },
    { label: t.nav.services, href: "/services" },
    {
      label: t.nav.informasi,
      children: [
        { label: t.nav.artikel, href: "/blog" },
        { label: t.nav.keluhanDanBanding, href: "/keluhan-dan-banding" },
      ],
    },
    { label: t.nav.contact, href: "/contact" },
  ];
}

export const company = {
  name: "PT. Global Inspeksi Forensik Teknik",
  shortName: "Global Inspeksi Forensik Teknik",
  phone: "+62 812-5056-7742",
  whatsapp: "6281250567742",
  email: "globalinspeksiforensikteknik@gmail.com",
  address: "91 District BSD No C5, Pagedangan, Tangerang, Banten 15339",
};

const whatsappMessage: Record<Locale, string> = {
  id: "Halo, saya ingin bertanya mengenai layanan GIFT Laboratory.",
  en: "Hello, I would like to ask about GIFT Laboratory's services.",
};

export function getWhatsappLink(locale: Locale, number: string = company.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage[locale])}`;
}

const contactCardsBase = [
  {
    key: "email" as const,
    description: company.email,
    icon: Mail,
    href: `mailto:${company.email}`,
  },
  {
    key: "phone" as const,
    description: company.phone,
    icon: Phone,
    external: true,
  },
  {
    key: "location" as const,
    description: company.address,
    icon: MapPin,
    href: "https://share.google/AGl5avcvPFOvNL6dA",
    external: true,
  },
];

export function getContactCards(t: LandingDictionary) {
  return contactCardsBase.map((card) => ({ ...card, title: t.contactCards[card.key] }));
}

export const blogCategories = [
  "All Posts",
  "Berita Perusahaan",
  "Forensik Teknik",
  "Pengujian Material Konstruksi",
];

export const blogPosts: {
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  href: string;
}[] = [];

export const clientLogos = [
  { src: "/landing/client-mutubeton.png?v=2", alt: "Mutu Beton", large: true },
  { src: "/landing/client-indoprecast-original.png?v=2", alt: "INDOPRECAST", large: true },
  { src: "/landing/client-spi.png?v=2", alt: "Shangyang Perkasa Indonesia" },
  { src: "/landing/client-global-inspeksi-sistem.png?v=2", alt: "Global Inspeksi Sistem", large: true },
  { src: "/landing/client-bep.png?v=2", alt: "BEP Precast and Prestress Concrete", large: true },
  { src: "/landing/client-jaya.png?v=2", alt: "Jaya Beton" },
  { src: "/landing/client-asiacon.png?v=2", alt: "Asiacon Cipta Prima", large: true },
];

/** Fixed display order for the services grid/promo cards, by slug (same across locales). */
export const serviceSlugs = [
  "uji-kuat-tekan",
  "uji-material-u-ditch-box-culvert",
  "inspeksi-draught-survey",
  "inspeksi-container-survey",
];

const serviceImagesBySlug: Record<string, string> = {
  "uji-kuat-tekan": "/landing/service-uji-kuat-tekan.png",
  "inspeksi-draught-survey": "/landing/service-draught-survey.jpg",
  "uji-material-u-ditch-box-culvert": "/landing/service-uditch-box-culvert.png",
  "inspeksi-container-survey": "/landing/service-container-survey.jpg",
};

export function getOrderedServices(t: LandingDictionary) {
  return serviceSlugs.map((slug) => ({
    ...t.services.find((s) => s.slug === slug)!,
    image: serviceImagesBySlug[slug],
  }));
}

/** Server-side lookup (e.g. generateMetadata) where no client language context exists. */
export function getServiceBySlug(slug: string, locale: Locale = "id") {
  const service = dictionary[locale].services.find((s) => s.slug === slug);
  if (!service) return null;
  return { service, image: serviceImagesBySlug[slug] };
}
