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

export const blogPosts = [
  {
    title: "Mengapa Pengujian Material Konstruksi Penting?",
    date: "March 4, 2026",
    category: "Pengujian Material Konstruksi",
    image: "https://gift-laboratory.com/wp-content/uploads/2026/03/Konten-GIFT.png",
    excerpt:
      "Kualitas bangunan sangat ditentukan oleh mutu material yang digunakan. Pengujian material membantu memastikan spesifikasi terpenuhi, risiko kegagalan ditekan, dan keputusan proyek dibuat berdasarkan data.",
    content: [
      "Dalam proyek konstruksi, hasil akhir yang kuat dan aman tidak terjadi secara kebetulan. Kualitas bangunan sangat dipengaruhi oleh mutu material yang dipakai, mulai dari beton, baja, agregat, sampai material pendukung lain. Karena itu, pengujian material konstruksi menjadi langkah teknis untuk memastikan spesifikasi terpenuhi, risiko kegagalan ditekan, dan keputusan proyek dibuat berdasarkan data.",
      "Berikut alasan utama mengapa pengujian material konstruksi penting serta bagaimana pengujian membantu menjaga mutu proyek dari awal sampai serah terima.",
      "---",
      "## 1) Menjamin Kekuatan Struktur",
      "Material yang terlihat baik secara visual belum tentu memenuhi mutu rencana. Pengujian membantu memastikan parameter teknis seperti kekuatan, konsistensi, dan karakteristik fisik sesuai dengan spesifikasi desain serta kebutuhan lapangan.",
      "Contohnya:",
      "- Beton perlu memenuhi target mutu rencana agar struktur bekerja sesuai perhitungan.",
      "- Baja perlu memenuhi persyaratan kekuatan dan ketangguhan agar aman menahan beban.",
      "- Agregat perlu memenuhi gradasi dan kebersihan tertentu agar campuran stabil.",
      "Dengan data uji, tim proyek memiliki dasar yang jelas untuk menerima, menolak, atau melakukan perbaikan sebelum material dipasang.",
      "---",
      "## 2) Mencegah Kegagalan Konstruksi Sejak Dini",
      "Banyak kerusakan konstruksi berawal dari cacat material yang terlambat terdeteksi, seperti mutu tidak konsisten, material tercampur, proses produksi tidak stabil, atau penyimpanan yang kurang tepat. Pengujian laboratorium berperan sebagai filter untuk menemukan potensi masalah lebih awal.",
      "Dampaknya nyata:",
      "- Mengurangi rework dan pembongkaran yang mahal.",
      "- Mencegah keterlambatan proyek akibat perbaikan berulang.",
      "- Menekan risiko insiden keselamatan kerja dan kegagalan struktur.",
      "Prinsipnya sederhana: lebih murah dan lebih aman memperbaiki di awal daripada menanggung akibat di akhir.",
      "---",
      "## 3) Memenuhi Standar & Regulasi (SNI dan Persyaratan Teknis Proyek)",
      "Di banyak proyek, pemenuhan standar seperti SNI dan persyaratan teknis kontrak adalah kewajiban. Pengujian material menjadi bukti objektif bahwa pekerjaan dilakukan sesuai ketentuan yang dipersyaratkan.",
      "Dokumen hasil uji biasanya diperlukan untuk:",
      "- Persetujuan material atau material approval.",
      "- Proses QC/QA dan audit mutu internal.",
      "- Serah terima pekerjaan dan dokumentasi proyek.",
      "- Penyelesaian klaim teknis jika terjadi sengketa mutu.",
      "Dengan kata lain, pengujian bukan hanya soal teknis, tetapi juga perlindungan administrasi dan legal bagi pemilik proyek, kontraktor, maupun konsultan.",
      "---",
      "## 4) Menjadi Dasar Pengendalian Mutu Proyek",
      "Pengendalian mutu yang baik berbasis data, bukan asumsi. Data uji membantu proyek mengambil keputusan yang akurat dan dapat dipertanggungjawabkan.",
      "Contoh keputusan yang bisa didukung oleh data uji:",
      "- Apakah material batch tertentu layak dipakai?",
      "- Apakah proses produksi atau supplier perlu dikoreksi?",
      "- Apakah ada tren penurunan mutu yang perlu tindakan cepat?",
      "Pengujian berkala juga membantu menjaga konsistensi, terutama pada proyek panjang atau proyek yang melibatkan banyak pemasok.",
      "---",
      "## Kapan Pengujian Material Sebaiknya Dilakukan?",
      "Agar efektif, pengujian idealnya dilakukan pada beberapa titik berikut:",
      "1. Pra-konstruksi: verifikasi material awal dan uji kelayakan.",
      "2. Saat penerimaan material: memastikan material masuk sesuai spesifikasi.",
      "3. Selama pelaksanaan: monitoring konsistensi mutu melalui sampling berkala.",
      "4. Saat ada indikasi masalah: investigasi teknis jika ditemukan retak, penurunan mutu, atau ketidaksesuaian hasil lapangan.",
    ].join("\n\n"),
    href: "/blog/mengapa-pengujian-material-konstruksi-penting",
  },
  {
    title: "Pengujian Material Konstruksi dan Uji Kuat Tekan Beton Sesuai Standar SNI",
    date: "December 17, 2025",
    category: "Pengujian Material Konstruksi",
    image: "https://gift-laboratory.com/wp-content/uploads/2025/12/Konten-Instagram-GIFT.png",
    excerpt:
      "Dalam setiap proyek konstruksi, kekuatan struktur tidak hanya ditentukan oleh desain yang baik, tetapi juga oleh mutu material yang digunakan.",
    content: [
      "## Uji Kuat Tekan Beton dan Pengujian Material Konstruksi",
      "Dalam setiap proyek konstruksi, kekuatan struktur tidak hanya ditentukan oleh desain yang baik, tetapi juga oleh mutu material yang digunakan. Beton yang tampak padat dan rapi belum tentu memiliki kekuatan sesuai perencanaan. Tanpa pengujian yang tepat, kualitas material sering kali hanya diasumsikan, bukan dibuktikan.",
      "Di sinilah pengujian material konstruksi memegang peranan penting. Melalui pengujian laboratorium, mutu beton dan produk precast dapat diverifikasi secara objektif, sehingga risiko kegagalan struktur dapat diminimalkan sejak tahap awal.",
      "PT Global Inspeksi Forensik Teknik (GIFT) hadir untuk membantu memastikan bahwa setiap material konstruksi memenuhi standar mutu dan keamanan melalui layanan pengujian yang akurat dan dapat dipertanggungjawabkan.",
      "---",
      "## Mengapa Uji Kuat Tekan Beton Menjadi Parameter Utama?",
      "Uji kuat tekan beton merupakan salah satu metode paling penting dalam pengendalian mutu konstruksi. Pengujian ini bertujuan untuk mengetahui kemampuan beton dalam menahan beban tekan sesuai mutu rencana yang telah ditetapkan.",
      "Tanpa uji kuat tekan, kualitas beton hanya dinilai berdasarkan tampilan visual atau pengalaman lapangan. Hal ini berpotensi menimbulkan kesalahan penilaian, mulai dari penurunan kekuatan struktur, retak dini, sampai kegagalan konstruksi.",
      "Dengan melakukan uji kuat tekan beton, pihak proyek dapat:",
      "- Memastikan mutu beton sesuai spesifikasi teknis.",
      "- Menjamin keamanan dan keandalan struktur.",
      "- Mengurangi risiko kerusakan dan perbaikan di kemudian hari.",
      "- Mengambil keputusan teknis berdasarkan data yang terukur.",
      "---",
      "## Layanan Uji Kuat Tekan Beton di GIFT",
      "Sebagai laboratorium pengujian material konstruksi, GIFT melayani uji kuat tekan beton untuk berbagai kelas mutu, mulai dari beton mutu menengah hingga beton mutu tinggi.",
      "Jenis mutu beton yang dapat diuji antara lain:",
      "- Beton K300.",
      "- Beton K350.",
      "- Beton K400.",
      "- Beton K450.",
      "- Beton K >= 500.",
      "Pengujian dilakukan menggunakan mesin uji tekan yang terkalibrasi dengan prosedur yang mengacu pada standar SNI. Setiap hasil pengujian disajikan secara sistematis sehingga dapat digunakan sebagai dasar evaluasi mutu beton secara objektif dan terpercaya.",
      "---",
      "## Pengujian Produk Precast: U-Ditch dan Box Culvert",
      "Selain beton cor di tempat, produk precast juga memerlukan pengujian untuk memastikan kualitas dan kelayakan penggunaannya di lapangan. Produk precast yang tidak memenuhi standar dapat berdampak langsung pada fungsi dan keamanan infrastruktur.",
      "### Uji Produk U-Ditch",
      "U-Ditch banyak digunakan sebagai saluran drainase dan infrastruktur pendukung lainnya. Melalui pengujian, mutu beton dan kekuatan produk dapat diverifikasi agar sesuai dengan spesifikasi teknis serta kebutuhan operasional di lapangan.",
      "### Uji Produk Box Culvert",
      "Box Culvert berperan penting dalam sistem drainase dan utilitas bawah tanah. Pengujian Box Culvert dilakukan untuk memastikan karakteristik beton dan kekuatan struktur produk memenuhi standar, sehingga aman dan andal digunakan dalam jangka panjang.",
      "---",
      "## Standar dan Pendekatan Pengujian Material Konstruksi",
      "Setiap layanan pengujian material di GIFT dilakukan dengan pendekatan profesional dan berorientasi pada akurasi data. Proses pengujian didukung oleh:",
      "- Prosedur pengujian yang mengacu pada standar SNI.",
      "- Peralatan laboratorium yang terkalibrasi.",
      "- Analis dan tenaga teknis yang berpengalaman.",
      "- Sistem pelaporan yang transparan dan dapat ditelusuri.",
      "Pendekatan ini memastikan setiap hasil pengujian memiliki integritas tinggi dan dapat digunakan sebagai dasar pengambilan keputusan teknis yang bertanggung jawab.",
      "---",
      "## Laboratorium Pengujian Material yang Dapat Dipercaya",
      "Dalam dunia konstruksi, keandalan data pengujian sangat menentukan keberhasilan proyek. Oleh karena itu, pemilihan laboratorium pengujian yang kompeten menjadi langkah penting.",
      "PT Global Inspeksi Forensik Teknik berkomitmen menjadi mitra yang andal bagi kontraktor, konsultan, produsen precast, maupun pemilik proyek dalam menjaga kualitas material konstruksi. Pengujian material bukan sekadar memenuhi persyaratan, tetapi juga investasi untuk keselamatan, kualitas, dan keberlanjutan bangunan.",
      "---",
      "## Kesimpulan",
      "Uji kuat tekan beton dan pengujian produk precast merupakan bagian penting dalam pengendalian mutu konstruksi. Dengan pengujian yang tepat, risiko kegagalan struktur dapat ditekan dan kualitas bangunan dapat dijaga secara konsisten.",
      "Melalui layanan pengujian material konstruksi yang profesional dan mengacu pada standar SNI, PT Global Inspeksi Forensik Teknik siap mendukung proyek Anda dengan data yang akurat, objektif, dan dapat dipertanggungjawabkan.",
    ].join("\n\n"),
    href: "/blog/layanan-pengujian-material-konstruksi-fondasi-penting-untuk-proyek-yang-aman-dan-andal",
  },
  {
    title: "Tentang Kami: Global Inspeksi Forensik Teknik",
    date: "September 20, 2024",
    category: "Berita Perusahaan",
    image: "https://gift-laboratory.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-24-at-09.12.32-1.jpeg",
    excerpt:
      "Global Inspeksi Forensik Teknik hadir sebagai laboratorium inspeksi dan analisis forensik konstruksi yang berkomitmen pada profesionalisme, akurasi, dan integritas layanan.",
    content: [
      "## Profil Global Inspeksi Forensik Teknik",
      "Global Inspeksi Forensik Teknik berdiri sebagai laboratorium yang bergerak di bidang inspeksi dan analisis forensik konstruksi. Sejak awal operasionalnya, perusahaan berkomitmen menyediakan layanan yang menyeluruh dan akurat untuk memastikan integritas setiap proyek yang ditangani.",
      "Sebagai laboratorium yang dibangun di atas profesionalisme dan integritas, GIFT berupaya menjaga standar layanan yang tinggi dalam setiap aspek operasional. Visi perusahaan adalah menjadi pemimpin dalam solusi forensik yang inovatif dan terdepan, dengan misi memberikan layanan yang responsif dan akurat untuk memenuhi kebutuhan klien.",
      "Setiap pekerjaan didasarkan pada prinsip transparansi dan kepercayaan. Tujuannya adalah menciptakan hubungan jangka panjang dengan klien serta menyediakan hasil yang dapat diandalkan dan bermanfaat bagi semua pihak yang terlibat.",
      "Tim ahli GIFT terdiri dari profesional berpengalaman dengan latar belakang berbagai disiplin ilmu seperti teknik sipil, kimia, dan forensik. Pengalaman kolektif ini memperkaya proses analisis dan membantu merumuskan solusi yang tepat serta berkelanjutan.",
      "Setiap anggota tim berkomitmen melakukan penelitian mendalam sebagai dasar laporan dan rekomendasi. Hasil inspeksi tidak hanya diperlakukan sebagai angka, tetapi sebagai alat untuk menciptakan lingkungan konstruksi yang lebih aman dan berkelanjutan.",
      "---",
      "## Layanan dan Solusi yang Diberikan",
      "Global Inspeksi Forensik Teknik menawarkan berbagai layanan untuk kebutuhan inspeksi dan analisis struktural secara menyeluruh. Salah satu layanan utama adalah inspeksi bangunan untuk mengidentifikasi potensi masalah yang dapat memengaruhi keamanan dan integritas struktur.",
      "Inspeksi dilakukan melalui pemeriksaan visual serta metode non-destruktif untuk memastikan ketepatan hasil. Dengan pendekatan ini, klien mendapatkan informasi yang lebih akurat mengenai kondisi struktur.",
      "Salah satu fokus penting dalam layanan GIFT adalah analisis struktural. Tim ahli menggunakan teknik analisis yang canggih untuk mengevaluasi kekuatan dan ketahanan bangunan. Dengan pemahaman mendalam tentang perilaku material dan teknik konstruksi, kelemahan struktural yang tidak selalu terlihat dalam inspeksi biasa dapat diidentifikasi.",
      "GIFT juga menerapkan metode identifikasi masalah yang sistematis, termasuk pengujian laboratorium material dan simulasi komputer. Pendekatan ini membantu memahami kondisi bangunan serta memprediksi bagaimana struktur bereaksi terhadap tekanan dan beban.",
      "Setelah analisis lengkap, tim memberikan rekomendasi perbaikan yang jelas dan terperinci. Rekomendasi tersebut dapat mencakup solusi teknis yang sesuai serta rencana pemeliharaan berkala agar bangunan tetap aman dan berfungsi dengan baik.",
      "Dalam seluruh proses inspeksi, teknologi dan alat terbaru juga berperan penting. Dengan perangkat pemantauan yang mendukung pengumpulan data real-time, GIFT dapat memberikan gambaran komprehensif mengenai kondisi struktural dan membantu klien memastikan bangunan tetap aman sesuai standar keselamatan yang berlaku.",
    ].join("\n\n"),
    href: "/blog/tentang-kami-global-inspeksi-forensik-teknik-6",
  },
];

export const clientLogos = [
  { src: "/landing/client-mutubeton.png", alt: "Mutu Beton" },
  { src: "/landing/client-indoprecast-original.png", alt: "INDOPRECAST" },
  { src: "/landing/client-spi.png", alt: "Shangyang Perkasa Indonesia" },
  { src: "/landing/client-global-inspeksi-sistem.png", alt: "Global Inspeksi Sistem" },
  { src: "/landing/client-bep.png", alt: "BEP Precast and Prestress Concrete" },
  { src: "/landing/client-jaya.png", alt: "Jaya Beton" },
  { src: "/landing/client-asiacon.png", alt: "Asiacon Cipta Prima" },
];
