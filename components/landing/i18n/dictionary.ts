export type Locale = "id" | "en";

export type ServiceCopy = {
  slug: string;
  title: string;
  description: string;
  servicePageDescription: string;
  detailParagraph: string;
  highlights: string[];
};

export type LandingDictionary = {
  nav: {
    home: string;
    profile: string;
    services: string;
    informasi: string;
    artikel: string;
    keluhanDanBanding: string;
    contact: string;
  };
  companyDescription: string;
  footer: {
    navigation: string;
    contactInfo: string;
  };
  clients: {
    heading: string;
  };
  contactCards: {
    email: string;
    phone: string;
    location: string;
  };
  hero: {
    title: string;
    prefix: string;
    lines: string[];
    description: string;
    cta: string;
  };
  about: {
    kicker: string;
    paragraphs: string[];
    cta: string;
  };
  vision: {
    heading: string;
    text: string;
  };
  mission: {
    heading: string;
    items: { title: string; description: string }[];
  };
  facilities: {
    heading: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  servicesSection: {
    heading: string;
    quote: string;
    contactCta: string;
    promoCta: string;
  };
  homeServices: {
    heading: string;
    readMore: string;
  };
  profile: {
    kicker: string;
  };
  contactPage: {
    kicker: string;
    intro: string;
  };
  contactBand: {
    kicker: string;
    heading: string;
    copy: string;
    officeHeading: string;
  };
  contactForm: {
    eyebrow: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    messagePlaceholder: string;
    sendLabel: string;
    sendingLabel: string;
    successMessage: string;
  };
  blog: {
    kicker: string;
    heading: string;
    emptyMessage: string;
    moreArticles: string;
    readMoreFeatured: string;
    readMoreCard: string;
    backToBlog: string;
    allCategoriesLabel: string;
  };
  keluhanBanding: {
    title: string;
    comingSoon: string;
  };
  policy: {
    tabImpartiality: string;
    tabAntiBribery: string;
    impartialityKicker: string;
    impartialityTitle: string;
    impartialityBody: string;
    signatureLocationDate: string;
    directorLabel: string;
    antiBriberyKicker: string;
    antiBriberyTitle: string;
    antiBriberyBody1: string;
    antiBriberyBody2: string;
    contactLabels: { email: string; phone: string; website: string; letter: string; address: string };
    closingNote: string;
  };
  services: ServiceCopy[];
};

export const dictionary: Record<Locale, LandingDictionary> = {
  id: {
    nav: {
      home: "Beranda",
      profile: "Profil",
      services: "Layanan",
      informasi: "Informasi",
      artikel: "Artikel",
      keluhanDanBanding: "Keluhan dan Banding",
      contact: "Kontak",
    },
    companyDescription:
      "Laboratorium pengujian dan inspeksi material konstruksi dengan dukungan sistem LHU digital yang dapat diverifikasi publik.",
    footer: {
      navigation: "Navigasi",
      contactInfo: "Info Kontak",
    },
    clients: {
      heading: "Klien Kami",
    },
    contactCards: {
      email: "Email Kantor",
      phone: "Telepon Kantor",
      location: "Lokasi Kantor",
    },
    hero: {
      title: "Pengujian Laboratorium & Inspeksi Material",
      prefix: "Pengujian & Inspeksi",
      lines: [
        "Sesuai Standar Nasional!",
        "Hasil yang Akurat & Terpercaya!",
        "Didukung Tenaga Ahli Profesional!",
        "Menjamin Mutu & Keamanan!",
      ],
      description:
        "Kami menyediakan layanan pengujian laboratorium dan inspeksi yang akurat, terpercaya, dan sesuai standar nasional untuk menjamin mutu serta keamanan produk maupun material Anda.",
      cta: "Lihat Selengkapnya",
    },
    about: {
      kicker: "Tentang Kami",
      paragraphs: [
        "PT. Global Inspeksi Forensik Teknik adalah laboratorium yang bergerak di bidang pengujian konstruksi, dan merupakan bagian dari Lembaga Sertifikasi Global Inspeksi Sertifikasi. Kami mendukung program pemerintah dalam penerapan Standar Nasional Indonesia (SNI) untuk memastikan kualitas dan keamanan konstruksi di Indonesia.",
          "Laboratorium kami berlokasi di BSD, Tangerang, dan fokus pada pengujian material bangunan serta struktur konstruksi. Dengan memanfaatkan fasilitas gedung yang modern serta peralatan pengujian yang lengkap dan terkalibrasi, kami berkomitmen untuk memberikan hasil uji yang akurat dan terpercaya.",
      ],
      cta: "Lihat Selengkapnya",
    },
    vision: {
      heading: "VISI",
      text: "Menjadi laboratorium pengujian produk beton yang paling dipercaya di Indonesia melalui hasil uji yang akurat, objektif, dan berstandar nasional maupun internasional.",
    },
    mission: {
      heading: "MISI",
      items: [
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
      ],
    },
    facilities: {
      heading: "Fasilitas dan Keunggulan",
      intro: "memiliki berbagai fasilitas unggul yang mendukung pengujian kualitas dan keamanan material konstruksi.",
      items: [
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
      ],
    },
    servicesSection: {
      heading: "LAYANAN KAMI",
      quote: "\"Uji Kuat Tekan & Uji Material U-Ditch/Box Culvert Dengan Ahli Profesional\"",
      contactCta: "Hubungi Kami",
      promoCta: "Hubungi kami",
    },
    homeServices: {
      heading: "Layanan Kami",
      readMore: "Lihat Selengkapnya",
    },
    profile: {
      kicker: "PROFIL PERUSAHAAN",
    },
    contactPage: {
      kicker: "Info Kontak",
      intro:
        "Hubungi tim kami untuk kebutuhan pengujian, inspeksi, dan verifikasi LHU. Kami siap membantu Anda dengan respons profesional dan terarah.",
    },
    contactBand: {
      kicker: "Mari Berdiskusi",
      heading: "Hubungi Kami!",
      copy: "Konsultasikan kebutuhan pengujian material konstruksi, inspeksi lapangan, atau penerbitan laporan hasil uji bersama tim GIFT Laboratory.",
      officeHeading: "Kantor Pusat",
    },
    contactForm: {
      eyebrow: "Kirim Pertanyaan",
      subtitle: "Tim kami akan menindaklanjuti melalui email resmi.",
      nameLabel: "Nama",
      emailLabel: "Email",
      companyLabel: "Perusahaan",
      messageLabel: "Pesan",
      namePlaceholder: "Nama lengkap",
      emailPlaceholder: "nama@perusahaan.com",
      companyPlaceholder: "Nama perusahaan / instansi",
      messagePlaceholder: "Ceritakan kebutuhan pengujian atau inspeksi Anda",
      sendLabel: "Send Message",
      sendingLabel: "Mengirim...",
      successMessage: "Terima kasih, pesan Anda berhasil terkirim. Tim kami akan segera menindaklanjuti.",
    },
    blog: {
      kicker: "Artikel & Berita",
      heading: "Blog & Artikel Terkini",
      emptyMessage: "Tidak ada artikel untuk kategori ini.",
      moreArticles: "Artikel Lainnya",
      readMoreFeatured: "Baca Selengkapnya",
      readMoreCard: "Baca",
      backToBlog: "Kembali ke Blog",
      allCategoriesLabel: "Semua Artikel",
    },
    keluhanBanding: {
      title: "Keluhan dan Banding",
      comingSoon: "Segera Hadir...",
    },
    policy: {
      tabImpartiality: "Kebijakan Ketidakberpihakan",
      tabAntiBribery: "Komitmen Anti Suap",
      impartialityKicker: "Kebijakan",
      impartialityTitle: "Ketidakberpihakan",
      impartialityBody:
        "PT Global Inspeksi Forensik Teknik berkomitmen untuk menjaga ketidakberpihakan, independensi, objektivitas, dan integritas dalam seluruh kegiatan pengujian laboratorium dan inspeksi. Seluruh layanan pengujian dan inspeksi dilaksanakan secara profesional, bebas dari tekanan komersial, keuangan, hubungan pribadi, hubungan organisasi, maupun tekanan lain yang dapat mempengaruhi hasil pengujian dan/atau inspeksi. Manajemen puncak memastikan bahwa setiap personel yang terlibat dalam kegiatan pengujian dan inspeksi wajib menjaga objektivitas, menghindari konflik kepentingan, serta tidak menerima intervensi dalam proses maupun hasil pekerjaan. PT Global Inspeksi Forensik Teknik mengidentifikasi, mengevaluasi, mengendalikan, dan meninjau risiko ketidakberpihakan secara berkala untuk memastikan hasil pengujian dan inspeksi tetap akurat, objektif, dan dapat dipercaya.",
      signatureLocationDate: "Tangerang, 7 Mei 2026",
      directorLabel: "Director",
      antiBriberyKicker: "Komitmen",
      antiBriberyTitle: "Anti Suap",
      antiBriberyBody1:
        "PT Global Inspeksi Forensik Teknik berkomitmen untuk menjalankan seluruh kegiatan pengujian laboratorium dan inspeksi secara jujur, profesional, transparan, independen, dan bebas dari praktik suap. Seluruh personel dilarang meminta, menerima, memberikan, atau menjanjikan uang, hadiah, gratifikasi, fasilitas, atau bentuk imbalan lainnya yang dapat mempengaruhi objektivitas, ketidakberpihakan, dan hasil pengujian maupun inspeksi. Setiap dugaan pelanggaran, benturan kepentingan, gratifikasi, atau praktik suap dapat dilaporkan kepada manajemen perusahaan untuk ditindaklanjuti secara rahasia, objektif, dan bertanggung jawab.",
      antiBriberyBody2:
        "Pelaporan ini dilakukan dengan dukungan data yang relevan dan dimaksudkan untuk kepentingan Perusahaan, tidak dimaksudkan untuk memaksakan seseorang. Pelaporan dapat disampaikan kepada Direktur Global Inspeksi Forensik Teknik atau Bagian Informasi Umum, melalui informasi sebagai berikut:",
      contactLabels: { email: "Email", phone: "Telp", website: "Site web", letter: "Letter", address: "Alamat" },
      closingNote:
        "Pelapor harus memberikan identitas mereka dalam melaporkan keluhan dan memastikan bahwa setiap informasi tentang identitas pihak pelapor dan laporannya dijaga kerahasiaannya. Pelaporan dilakukan di bawah prinsip anonim, rahasia dan independen.",
    },
    services: [
      {
        slug: "uji-kuat-tekan",
        title: "Uji Kuat Tekan",
        description: "Uji kuat tekan beton silinder K-300-K-500+ berstandar SNI/ASTM.",
        servicePageDescription: "Uji kuat tekan beton silinder K-300-K-500+ berstandar SNI.",
        detailParagraph:
          "Pengujian dilaksanakan mengacu pada SNI 1974:2011 menggunakan benda uji silinder beton berdiameter 152 mm dan tinggi 305 mm yang dirawat (curing) sebelum diuji pada umur 3, 7, dan 28 hari. Beban tekan diberikan secara bertahap hingga benda uji hancur, dan hasilnya dinyatakan dalam satuan MPa sebagai dasar evaluasi mutu beton sebelum digunakan pada struktur konstruksi.",
        highlights: [
          "Mengacu pada SNI 1974:2011 untuk benda uji silinder beton",
          "Pengujian dilakukan pada umur 3, 7, dan 28 hari",
          "Pembebanan bertahap 0,2-0,4 MPa/detik hingga benda uji hancur",
          "Hasil dinyatakan dalam MPa sebagai dasar evaluasi mutu beton",
        ],
      },
      {
        slug: "inspeksi-draught-survey",
        title: "Inspeksi Draught Survey",
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
      },
      {
        slug: "uji-material-u-ditch-box-culvert",
        title: "Uji Material U-Ditch & Box Culvert",
        description: "Verifikasi dimensi, mutu beton, penempatan tulangan, dan integritas sambungan.",
        servicePageDescription: "Verifikasi dimensi, mutu beton, penempatan tulangan, dan integritas sambungan",
        detailParagraph:
          "Pengujian produk pracetak U-Ditch dan Box Culvert mengacu pada SNI 03-6966-2003 dan SNI 6880:2016, mencakup verifikasi dimensi dan toleransi ukuran, mutu beton, serta penempatan dan selimut tulangan sesuai gambar kerja. Selain itu dilakukan load test secara bertahap untuk memastikan kapasitas struktur menahan beban lalu lintas dan tanah timbunan, serta uji kekedapan sambungan mengacu SNI 6468:2000 agar tidak terjadi kebocoran saat dipasang sebagai saluran drainase.",
        highlights: [
          "Mengacu pada SNI 03-6966-2003 dan SNI 6880:2016",
          "Verifikasi dimensi, toleransi, dan penempatan tulangan",
          "Load test bertahap untuk memastikan kapasitas menahan beban",
          "Uji kekedapan sambungan mengacu SNI 6468:2000",
        ],
      },
      {
        slug: "inspeksi-container-survey",
        title: "Inspeksi Container Survey",
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
      },
    ],
  },
  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      services: "Services",
      informasi: "Information",
      artikel: "Articles",
      keluhanDanBanding: "Complaints and Appeals",
      contact: "Contact",
    },
    companyDescription:
      "A construction material testing and inspection laboratory backed by a publicly verifiable digital test-report (LHU) system.",
    footer: {
      navigation: "Navigation",
      contactInfo: "Contact Info",
    },
    clients: {
      heading: "Our Clients",
    },
    contactCards: {
      email: "Office Email",
      phone: "Office Phone",
      location: "Office Location",
    },
    hero: {
      title: "Laboratory Testing & Material Inspection",
      prefix: "Testing & Inspection",
      lines: [
        "Compliant with National Standards!",
        "Accurate & Trusted Results!",
        "Backed by Professional Experts!",
        "Guaranteeing Quality & Safety!",
      ],
      description:
        "We provide laboratory testing and inspection services that are accurate, trusted, and compliant with national standards to ensure the quality and safety of your products and materials.",
      cta: "Learn More",
    },
    about: {
      kicker: "About Us",
      paragraphs: [
        "PT. Global Inspeksi Forensik Teknik is a laboratory engaged in construction testing and is part of the Global Inspeksi Sertifikasi Certification Body. We support government programs in implementing the Indonesian National Standard (SNI) to ensure construction quality and safety in Indonesia.",
        "Our laboratory is located in BSD, Tangerang, and focuses on testing building materials and construction structures. By utilizing modern building facilities and complete, calibrated testing equipment, we are committed to delivering accurate and trusted test results.",
      ],
      cta: "Learn More",
    },
    vision: {
      heading: "VISION",
      text: "To become the most trusted concrete product testing laboratory in Indonesia through accurate, objective test results that meet both national and international standards.",
    },
    mission: {
      heading: "MISSION",
      items: [
        {
          title: "Testing Accuracy",
          description:
            "Producing accurate, objective concrete product test data that follows national standards, serving as a reliable basis for technical decisions.",
        },
        {
          title: "Product Safety & Quality",
          description:
            "Ensuring concrete products meet quality requirements for safe use, reducing the risk of failure, and adding value for consumers and industry.",
        },
        {
          title: "Human Resource Competence",
          description:
            "Improving the capability of analysts and technicians through training, certification, and procedural discipline to maintain professionalism in every testing process.",
        },
        {
          title: "Trusted Partnership",
          description:
            "Providing responsive, transparent, solution-oriented service to support customer needs and strengthen relationships with the construction industry.",
        },
      ],
    },
    facilities: {
      heading: "Facilities & Strengths",
      intro: "has a range of outstanding facilities that support the testing of construction material quality and safety.",
      items: [
        {
          title: "Best Equipment and Human Resources",
          description:
            "This laboratory is equipped with the latest testing equipment and supported by reliable, competent, and experienced personnel in carrying out construction analysis activities.",
        },
        {
          title: "Testing in Line with National Standards",
          description:
            "PT. Global Inspeksi Forensik Teknik carries out testing in accordance with the national standard (SNI) set under government programs to ensure construction safety and quality.",
        },
        {
          title: "Using the Latest Methods and Technology",
          description:
            "This laboratory continuously updates its methods, equipment, and testing technology to deliver results that are accurate, fast, and trusted by clients.",
        },
      ],
    },
    servicesSection: {
      heading: "OUR SERVICES",
      quote: "\"Compressive Strength Testing & U-Ditch/Box Culvert Material Testing by Professional Experts\"",
      contactCta: "Contact Us",
      promoCta: "Contact us",
    },
    homeServices: {
      heading: "Our Services",
      readMore: "Learn More",
    },
    profile: {
      kicker: "COMPANY PROFILE",
    },
    contactPage: {
      kicker: "Contact Info",
      intro:
        "Contact our team for your testing, inspection, and LHU verification needs. We're ready to help you with a professional, focused response.",
    },
    contactBand: {
      kicker: "Get in touch",
      heading: "Contact Us!",
      copy: "Discuss your construction material testing needs, field inspections, or test-report issuance with the GIFT Laboratory team.",
      officeHeading: "Main Office",
    },
    contactForm: {
      eyebrow: "Send an Inquiry",
      subtitle: "Our team will follow up via official email.",
      nameLabel: "Name",
      emailLabel: "Email",
      companyLabel: "Company",
      messageLabel: "Message",
      namePlaceholder: "Full name",
      emailPlaceholder: "name@company.com",
      companyPlaceholder: "Company / institution name",
      messagePlaceholder: "Tell us about your testing or inspection needs",
      sendLabel: "Send Message",
      sendingLabel: "Sending...",
      successMessage: "Thank you, your message has been sent successfully. Our team will follow up shortly.",
    },
    blog: {
      kicker: "Articles & News",
      heading: "Latest Blog & Articles",
      emptyMessage: "No articles in this category.",
      moreArticles: "More Articles",
      readMoreFeatured: "Read More",
      readMoreCard: "Read",
      backToBlog: "Back to Blog",
      allCategoriesLabel: "All Posts",
    },
    keluhanBanding: {
      title: "Complaints and Appeals",
      comingSoon: "Coming Soon...",
    },
    policy: {
      tabImpartiality: "Impartiality Policy",
      tabAntiBribery: "Anti-Bribery Commitment",
      impartialityKicker: "Policy",
      impartialityTitle: "Impartiality",
      impartialityBody:
        "PT Global Inspeksi Forensik Teknik is committed to maintaining impartiality, independence, objectivity, and integrity across all laboratory testing and inspection activities. All testing and inspection services are carried out professionally, free from commercial, financial, personal, or organizational pressure, or any other pressure that could influence testing and/or inspection results. Top management ensures that every person involved in testing and inspection activities maintains objectivity, avoids conflicts of interest, and does not accept any intervention in the process or results of the work. PT Global Inspeksi Forensik Teknik regularly identifies, evaluates, controls, and reviews impartiality risks to ensure that testing and inspection results remain accurate, objective, and trustworthy.",
      signatureLocationDate: "Tangerang, May 7, 2026",
      directorLabel: "Director",
      antiBriberyKicker: "Commitment",
      antiBriberyTitle: "Anti-Bribery",
      antiBriberyBody1:
        "PT Global Inspeksi Forensik Teknik is committed to carrying out all laboratory testing and inspection activities honestly, professionally, transparently, independently, and free from bribery. All personnel are prohibited from requesting, accepting, giving, or promising money, gifts, gratuities, facilities, or other forms of compensation that could influence the objectivity, impartiality, and results of testing or inspection. Any suspected violation, conflict of interest, gratuity, or bribery may be reported to company management for follow-up in a confidential, objective, and accountable manner.",
      antiBriberyBody2:
        "Reports are made with supporting, relevant data and are intended for the Company's interest, not to pressure any individual. Reports can be submitted to the Director of Global Inspeksi Forensik Teknik or the General Information Division, through the following information:",
      contactLabels: { email: "Email", phone: "Phone", website: "Website", letter: "Letter", address: "Address" },
      closingNote:
        "Whistleblowers must provide their identity when reporting a complaint, and any information about the reporting party's identity and report will be kept confidential. Reporting is conducted under principles of anonymity, confidentiality, and independence.",
    },
    services: [
      {
        slug: "uji-kuat-tekan",
        title: "Compressive Strength Test",
        description: "K-300 to K-500+ concrete cylinder compressive strength testing per SNI/ASTM.",
        servicePageDescription: "K-300 to K-500+ concrete cylinder compressive strength testing per SNI.",
        detailParagraph:
          "Testing is carried out in accordance with SNI 1974:2011 using concrete cylinder specimens 152 mm in diameter and 305 mm in height, cured before being tested at 3, 7, and 28 days. Compressive load is applied gradually until the specimen fails, with results stated in MPa as the basis for evaluating concrete quality before it is used in a construction structure.",
        highlights: [
          "Based on SNI 1974:2011 for concrete cylinder specimens",
          "Testing performed at 3, 7, and 28 days of age",
          "Gradual loading of 0.2-0.4 MPa/second until specimen failure",
          "Results stated in MPa as the basis for concrete quality evaluation",
        ],
      },
      {
        slug: "inspeksi-draught-survey",
        title: "Draught Survey Inspection",
        description:
          "Determining bulk cargo weight based on the change in a vessel's draught before and after loading or unloading.",
        servicePageDescription:
          "Draught Survey is a method for determining bulk cargo weight based on the change in a vessel's draught before and after loading or unloading, following Archimedes' Principle, with forward, midship, and aft draft readings plus corrections for ballast, fuel, and ship's stores.",
        detailParagraph:
          "The surveyor reads the vessel's draft marks at the bow, midship, and stern on both the port and starboard sides before and after the loading or unloading process. The readings are then corrected for water density, trim, list, and deductions for ballast, fuel, fresh water, and ship's provisions, producing an accurate net cargo weight that both parties can rely on.",
        highlights: [
          "Based on Archimedes' Principle (change in vessel displacement)",
          "Draft readings at bow, midship, and stern on both sides of the vessel",
          "Corrections for water density, trim, list, ballast, fuel, and fresh water deductions",
          "Suitable for verifying bulk cargo such as coal, iron ore, grain, etc.",
        ],
      },
      {
        slug: "uji-material-u-ditch-box-culvert",
        title: "U-Ditch & Box Culvert Material Testing",
        description: "Verification of dimensions, concrete quality, rebar placement, and joint integrity.",
        servicePageDescription: "Verification of dimensions, concrete quality, rebar placement, and joint integrity",
        detailParagraph:
          "Testing of precast U-Ditch and Box Culvert products follows SNI 03-6966-2003 and SNI 6880:2016, covering verification of dimensions and size tolerances, concrete quality, and rebar placement and cover according to working drawings. A gradual load test is also performed to ensure the structure's capacity to withstand traffic and embankment loads, along with a joint watertightness test per SNI 6468:2000 to prevent leaks when installed as a drainage channel.",
        highlights: [
          "Based on SNI 03-6966-2003 and SNI 6880:2016",
          "Verification of dimensions, tolerances, and rebar placement",
          "Gradual load test to confirm load-bearing capacity",
          "Joint watertightness test per SNI 6468:2000",
        ],
      },
      {
        slug: "inspeksi-container-survey",
        title: "Container Survey Inspection",
        description:
          "Inspection of container condition to verify structural fitness, cleanliness, and compliance with safety standards.",
        servicePageDescription:
          "Container Survey is an inspection of container condition to verify structural fitness, cleanliness, and compliance with safety standards, covering walls, floor, roof, doors, seals, and markings.",
        detailParagraph:
          "Inspections are carried out as an on-hire survey before a container is leased and an off-hire survey upon return, recording the initial condition to prevent damage disputes between lessee and owner. The inspection covers the wall, floor, roof, door, and seal structure, cleanliness, and verification of the CSC plate and markings per ISO 6346, with condition assessment and repair needs based on Institute of International Container Lessors (IICL) criteria.",
        highlights: [
          "On-hire and off-hire surveys to prevent damage disputes",
          "Structural inspection: walls, floor, roof, doors, and seals",
          "CSC plate and marking verification per ISO 6346",
          "Condition assessment based on IICL repair criteria",
        ],
      },
    ],
  },
};
