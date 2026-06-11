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
  phone: "+62 812-5056-7742",
  whatsapp: "6281250567742",
  email: "globalinspeksiforensikteknik@gmail.com",
  address: "Ruko 91 District BSD No C5, Pagedangan, Tangerang, Banten 15339",
  description:
    "Laboratorium pengujian dan inspeksi material konstruksi dengan dukungan sistem LHU digital yang dapat diverifikasi publik.",
};

const whatsappMessage = "Halo, saya ingin bertanya mengenai layanan GIFT Laboratory.";
export const whatsappLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

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
    slug: "uji-kuat-tekan",
    description:
      "Uji kuat tekan beton silinder K-300-K-500+ berstandar SNI/ASTM.",
    servicePageDescription:
      "Uji kuat tekan beton silinder K-300-K-500+ berstandar SNI.",
    detailParagraph:
      "Pengujian dilaksanakan mengacu pada SNI 1974:2011 menggunakan benda uji silinder beton berdiameter 152 mm dan tinggi 305 mm yang dirawat (curing) sebelum diuji pada umur 3, 7, dan 28 hari. Beban tekan diberikan secara bertahap hingga benda uji hancur, dan hasilnya dinyatakan dalam satuan MPa sebagai dasar evaluasi mutu beton sebelum digunakan pada struktur konstruksi.",
    highlights: [
      "Mengacu pada SNI 1974:2011 untuk benda uji silinder beton",
      "Pengujian dilakukan pada umur 3, 7, dan 28 hari",
      "Pembebanan bertahap 0,2-0,4 MPa/detik hingga benda uji hancur",
      "Hasil dinyatakan dalam MPa sebagai dasar evaluasi mutu beton",
    ],
    icon: FlaskConical,
  },
  {
    title: "Inspeksi Draught Survey",
    slug: "inspeksi-draught-survey",
    description:
      "Penentuan berat kargo curah berdasarkan perubahan sarat kapal sebelum dan sesudah pemuatan atau pembongkaran.",
    servicePageDescription:
      "Draught Survey metode penentuan berat kargo curah berdasarkan perubahan sarat kapal sebelum dan sesudah pemuatan atau pembongkaran sesuai prinsip Hukum Archimedes, dengan pengukuran draft depan, tengah, dan belakang serta koreksi ballast, bahan bakar, dan persediaan kapal.",
    detailParagraph:
      "Surveyor membaca sarat kapal (draft mark) di bagian haluan, tengah, dan buritan pada sisi kanan dan kiri kapal sebelum dan sesudah proses muat atau bongkar. Hasil pembacaan kemudian dikoreksi terhadap densitas air, trim, list, serta deduksi ballast, bahan bakar, air tawar, dan perbekalan kapal sehingga diperoleh berat kargo bersih yang akurat dan dapat dipertanggungjawabkan oleh kedua belah pihak.",
    highlights: [
      "Berdasarkan prinsip Hukum Archimedes (perubahan displacement kapal)",
      "Pembacaan sarat (draft) di haluan, tengah, dan buritan pada kedua sisi kapal",
      "Koreksi densitas air, trim, list, serta deduksi ballast, BBM, dan air tawar",
      "Cocok untuk verifikasi muatan curah: batu bara, bijih besi, gandum, dll",
    ],
    icon: Ship,
  },
  {
    title: "Uji Material U-Ditch & Box Culvert",
    slug: "uji-material-u-ditch-box-culvert",
    description:
      "Verifikasi dimensi, mutu beton, penempatan tulangan, dan integritas sambungan.",
    servicePageDescription:
      "Verifikasi dimensi, mutu beton, penempatan tulangan, dan integritas sambungan",
    detailParagraph:
      "Pengujian produk pracetak U-Ditch dan Box Culvert mengacu pada SNI 03-6966-2003 dan SNI 6880:2016, mencakup verifikasi dimensi dan toleransi ukuran, mutu beton, serta penempatan dan selimut tulangan sesuai gambar kerja. Selain itu dilakukan load test secara bertahap untuk memastikan kapasitas struktur menahan beban lalu lintas dan tanah timbunan, serta uji kekedapan sambungan mengacu SNI 6468:2000 agar tidak terjadi kebocoran saat dipasang sebagai saluran drainase.",
    highlights: [
      "Mengacu pada SNI 03-6966-2003 dan SNI 6880:2016",
      "Verifikasi dimensi, toleransi, dan penempatan tulangan",
      "Load test bertahap untuk memastikan kapasitas menahan beban",
      "Uji kekedapan sambungan mengacu SNI 6468:2000",
    ],
    icon: ClipboardCheck,
  },
  {
    title: "Inspeksi Container Survey",
    slug: "inspeksi-container-survey",
    description:
      "Pemeriksaan kondisi peti kemas untuk memastikan kelayakan struktur, kebersihan, dan kepatuhan standar keselamatan.",
    servicePageDescription:
      "Container Survey pemeriksaan kondisi peti kemas untuk memastikan kelayakan struktur, kebersihan, dan kepatuhan terhadap standar keselamatan, meliputi dinding, lantai, atap, pintu, seal, dan penandaan.",
    detailParagraph:
      "Inspeksi dilakukan dalam bentuk on-hire survey sebelum kontainer disewa dan off-hire survey saat pengembalian, untuk mencatat kondisi awal dan mencegah sengketa kerusakan antara penyewa dan pemilik. Pemeriksaan mencakup struktur dinding, lantai, atap, pintu, dan seal, kebersihan, serta verifikasi plat CSC dan penandaan sesuai standar ISO 6346, dengan penilaian kondisi dan kebutuhan perbaikan mengacu pada kriteria Institute of International Container Lessors (IICL).",
    highlights: [
      "Survey on-hire dan off-hire untuk mencegah sengketa kerusakan",
      "Pemeriksaan struktur: dinding, lantai, atap, pintu, dan seal",
      "Verifikasi plat CSC dan marking sesuai standar ISO 6346",
      "Penilaian kondisi mengacu kriteria perbaikan IICL",
    ],
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
    href: whatsappLink,
    external: true,
  },
  {
    title: "Office Location",
    description: company.address,
    icon: MapPin,
    href: "https://share.google/AGl5avcvPFOvNL6dA",
    external: true,
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
