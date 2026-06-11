import {
  ClipboardCheck,
  FlaskConical,
  Mail,
  MapPin,
  Phone,
  Ship,
  Truck,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const company = {
  name: "PT. Global Inspeksi Forensik Teknik",
  shortName: "Global Inspeksi Forensik Teknik",
  phone: "+62 812-5065-7742",
  email: "globalinspeksiforensikteknik@gmail.com",
  address: "Ruko 91 District BSD No C5, Pagedangan, Tangerang, Banten 15339",
  description:
    "Laboratorium pengujian dan inspeksi material konstruksi dengan dukungan sistem LHU digital yang dapat diverifikasi publik.",
};

export const heroLines = [
  "Sesuai Standar Nasional!",
  "Hasil yang Akurat & Terpercaya!",
  "Didukung Tenaga Ahli Profesional!",
  "Menjamin Mutu & Keamanan!",
];

export const profileParagraphs = [
  "PT. Global Inspeksi Forensik Teknik adalah laboratorium yang bergerak di bidang pengujian konstruksi, dan merupakan bagian dari Lembaga Sertifikasi Global Inspeksi Sertifikasi. Kami mendukung program pemerintah dalam penerapan Standar Nasional Indonesia (SNI) untuk memastikan kualitas dan keamanan konstruksi di Indonesia.",
  "Laboratorium kami berlokasi di BSD, Tangerang, dan fokus pada pengujian material bangunan serta struktur konstruksi. Dengan memanfaatkan fasilitas gedung yang modern serta peralatan pengujian yang lengkap dan terkalibrasi, kami berkomitmen untuk memberikan hasil uji yang akurat dan terpercaya.",
];

export const missionItems = [
  {
    title: "Akurasi Pengujian",
    description:
      "Menghasilkan data uji produk beton yang akurat, objektif, dan mengikuti standar nasional sehingga dapat dijadikan dasar keputusan teknis yang terpercaya.",
  },
  {
    title: "Keamanan & Kualitas Produk",
    description:
      "Memastikan produk beton memenuhi persyaratan mutu agar aman digunakan, mengurangi risiko kegagalan, dan memberikan nilai tambah bagi konsumen serta industri.",
  },
  {
    title: "Kompetensi SDM",
    description:
      "Meningkatkan kemampuan analis dan teknisi melalui pelatihan, sertifikasi, serta disiplin prosedur untuk menjaga profesionalitas dalam setiap proses pengujian.",
  },
  {
    title: "Kemitraan Terpercaya",
    description:
      "Memberikan layanan yang responsif, transparan, dan berorientasi solusi untuk mendukung kebutuhan pelanggan dan memperkuat hubungan dengan industri konstruksi.",
  },
];

export const facilities = [
  {
    title: "Peralatan dan Sumber Daya Manusia Terbaik",
    description:
      "Laboratorium ini dilengkapi dengan peralatan pengujian terkini dan didukung oleh Sumber Daya Manusia (SDM) yang handal, berkompeten, serta berpengalaman dalam melaksanakan kegiatan analisa konstruksi.",
  },
  {
    title: "Pengujian Sesuai Standar Nasional",
    description:
      "PT. Global Inspeksi Forensik Teknik melaksanakan pengujian yang sesuai dengan standar nasional (SNI) yang ditetapkan dalam program pemerintah untuk memastikan keamanan dan kualitas konstruksi.",
  },
  {
    title: "Menggunakan Metode dan Teknologi Terkini",
    description:
      "Laboratorium ini senantiasa memperbarui metode, peralatan, dan teknologi pengujian untuk memberikan hasil yang akurat, cepat, dan dapat dipercaya oleh para klien.",
  },
];

export const services = [
  {
    title: "Uji Kuat Tekan",
    description:
      "Uji kuat tekan beton silinder K-300-K-500+ berstandar SNI/ASTM.",
    servicePageDescription:
      "Uji kuat tekan beton silinder K-300-K-500+ berstandar SNI.",
    icon: FlaskConical,
  },
  {
    title: "Inspeksi Draught Survey",
    description:
      "Penentuan berat kargo curah berdasarkan perubahan sarat kapal sebelum dan sesudah pemuatan atau pembongkaran.",
    servicePageDescription:
      "Draught Survey metode penentuan berat kargo curah berdasarkan perubahan sarat kapal sebelum dan sesudah pemuatan atau pembongkaran sesuai prinsip Hukum Archimedes, dengan pengukuran draft depan, tengah, dan belakang serta koreksi ballast, bahan bakar, dan persediaan kapal.",
    icon: Ship,
  },
  {
    title: "Uji Material U-Ditch & Box Culvert",
    description:
      "Verifikasi dimensi, mutu beton, penempatan tulangan, dan integritas sambungan.",
    servicePageDescription:
      "Verifikasi dimensi, mutu beton, penempatan tulangan, dan integritas sambungan",
    icon: ClipboardCheck,
  },
  {
    title: "Inspeksi Container Survey",
    description:
      "Pemeriksaan kondisi peti kemas untuk memastikan kelayakan struktur, kebersihan, dan kepatuhan standar keselamatan.",
    servicePageDescription:
      "Container Survey pemeriksaan kondisi peti kemas untuk memastikan kelayakan struktur, kebersihan, dan kepatuhan terhadap standar keselamatan, meliputi dinding, lantai, atap, pintu, seal, dan penandaan.",
    icon: Truck,
  },
];

export const contactCards = [
  {
    title: "Office Email",
    description: company.email,
    icon: Mail,
  },
  {
    title: "Office Phone",
    description: company.phone,
    icon: Phone,
  },
  {
    title: "Office Location",
    description: company.address,
    icon: MapPin,
  },
];

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
  { src: "/landing/client-mutubeton.png", alt: "Mutu Beton" },
  { src: "/landing/client-indoprecast-original.png", alt: "INDOPRECAST" },
  { src: "/landing/client-spi.png", alt: "Shangyang Perkasa Indonesia" },
  { src: "/landing/client-global-inspeksi-sistem.png", alt: "Global Inspeksi Sistem" },
  { src: "/landing/client-bep.png", alt: "BEP Precast and Prestress Concrete" },
  { src: "/landing/client-jaya.png", alt: "Jaya Beton" },
  { src: "/landing/client-asiacon.png", alt: "Asiacon Cipta Prima" },
];
