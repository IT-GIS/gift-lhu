import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  ClipboardCheck,
  FlaskConical,
  Handshake,
  Mail,
  MessageSquareText,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Ship,
  Truck,
  UserRound,
} from "lucide-react";
import {
  blogCategories,
  blogPosts,
  clientLogos,
  company,
  contactCards,
  facilities,
  heroLines,
  missionItems,
  navItems,
  profileParagraphs,
  services,
  whatsappLink,
} from "./landing-data";
import { ScrollFade } from "./ScrollFade";

type ActivePage = "Home" | "Profile" | "Services" | "Blog" | "Contact";

type BlogCard = {
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
  href: string;
};

const serviceImages = [
  "/landing/service-uji-kuat-tekan.png",
  "/landing/service-draught-survey.jpg",
  "/landing/service-uditch-box-culvert.png",
  "/landing/service-container-survey.jpg",
];

const servicePageImages = [
  serviceImages[0],
  serviceImages[2],
  serviceImages[1],
  serviceImages[3],
];

const facilityIllustration =
  "https://img.freepik.com/premium-photo/flat-2d-illustration-design_759095-88017.jpg?w=740";

const profileCompanyImage = "/landing/profile-company.jpeg";

const profileVisionImage = "/landing/profile-vision.png";

const profileMissionImage = "/landing/profile-mission.png";

const serviceElementIds = ["8bb5804", "2c75ba7", "e204c3a", "ef76db8"];

const facilityIcons = [UserRound, Award, FlaskConical];

const liveOrderedServices = [
  services[0],
  services[2],
  services[1],
  services[3],
];

export const serviceSlugs = liveOrderedServices.map((service) => service.slug);

export function getServiceBySlug(slug: string) {
  const index = liveOrderedServices.findIndex((service) => service.slug === slug);
  if (index === -1) return null;
  return { service: liveOrderedServices[index], image: servicePageImages[index] };
}

export function WpLandingShell({
  activePage,
  children,
}: {
  activePage: ActivePage;
  children: ReactNode;
}) {
  return (
    <>
      <WpHeader activePage={activePage} />
      {children}
      <WpFooter />
    </>
  );
}

export function HomeLandingPage() {
  return (
    <WpLandingShell activePage="Home">
      <main data-elementor-type="wp-page" data-elementor-id="1184" className="elementor elementor-1184">
        <section className="elementor-section elementor-top-section elementor-element elementor-element-3a538e800 elementor-section-boxed elementor-section-height-default elementor-section-height-default gift-wp-hero">
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1d7c6cc8">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="fade">
                  <div className="elementor-element elementor-element-dc58416 elementor-widget elementor-widget-heading">
                    <div className="elementor-widget-container">
                      <h4 className="elementor-heading-title elementor-size-default">Pengujian Laboratorium &amp; Inspeksi Material</h4>
                    </div>
                  </div>
                </ScrollFade>
                <ScrollFade variant="up" delay={0.1}>
                  <div className="elementor-element elementor-element-37e5df1a elementor-widget elementor-widget-wpr-advanced-text">
                    <div className="elementor-widget-container">
                      <div className="wpr-advanced-text">
                        <h1 className="wpr-advanced-text-preffix">Pengujian &amp; Inspeksi</h1>
                        <span className="wpr-anim-text">
                          {heroLines.map((line) => (
                            <b key={line}>{line}</b>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollFade>
                <ScrollFade variant="up" delay={0.2}>
                  <Divider className="elementor-element-5b199b24" />
                  <div className="elementor-element elementor-element-5412a0f7 elementor-widget elementor-widget-text-editor">
                    <div className="elementor-widget-container">
                      <p>
                        Kami menyediakan layanan pengujian laboratorium dan inspeksi yang akurat, terpercaya,
                        dan sesuai standar nasional untuk menjamin mutu serta keamanan produk maupun material Anda.
                      </p>
                    </div>
                  </div>
                  <WpButton className="elementor-element-23044d8" href="/services">
                    Lihat Selengkapnya
                  </WpButton>
                </ScrollFade>
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-top-section elementor-element elementor-element-63a4e9a0 elementor-section-boxed elementor-section-height-default gift-wp-about">
          <div className="elementor-container elementor-column-gap-default gift-wp-two-column">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-57d48a63">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="left">
                  <ImageWidget className="elementor-element-5530ede6" src="/landing/about-building.png" alt="Gedung laboratorium GIFT" />
                </ScrollFade>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6cebff71">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="right" delay={0.1}>
                  <Heading className="elementor-element-7d19e0" level={3}>Tentang Kami</Heading>
                  <Heading className="elementor-element-effe491">PT. Global Inspeksi Forensik Teknik</Heading>
                  <TextWidget className="elementor-element-30980496">
                    {profileParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </TextWidget>
                  <WpButton className="elementor-element-2e602150" href="/profile">
                    Lihat Selengkapnya
                  </WpButton>
                </ScrollFade>
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-top-section elementor-element elementor-element-28c7b67e elementor-section-boxed elementor-section-height-default gift-wp-vision">
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default gift-wp-two-column">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7495d363">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="left">
                  <Heading className="elementor-element-7582adce">VISI</Heading>
                  <TextWidget className="elementor-element-3a05b207">
                    <p>Menjadi laboratorium pengujian produk beton yang paling dipercaya di Indonesia melalui hasil uji yang akurat, objektif, dan berstandar nasional maupun internasional.</p>
                  </TextWidget>
                </ScrollFade>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5f082e66">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="right" delay={0.1}>
                  <Heading className="elementor-element-10daaa9">MISI</Heading>
                  <FeatureList className="elementor-element-46533381" />
                </ScrollFade>
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-top-section elementor-element elementor-element-1dc08d92 elementor-section-boxed elementor-section-height-default gift-wp-facilities">
          <div className="elementor-container elementor-column-gap-default gift-wp-two-column">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5d29a536">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="scale">
                  <ImageWidget className="elementor-element-5da5c2e gift-wp-facility-illustration" src={facilityIllustration} alt="Ilustrasi fasilitas laboratorium" />
                </ScrollFade>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-32158e6e">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="up" delay={0.1}>
                  <Heading className="elementor-element-5a5959f2" level={3}>Fasilitas dan Keunggulan</Heading>
                  <TextWidget className="elementor-element-563e6ef">
                    <p><strong>{company.name}</strong> memiliki berbagai fasilitas unggul yang mendukung pengujian kualitas dan keamanan material konstruksi.</p>
                  </TextWidget>
                  <FacilityFeatureList />
                </ScrollFade>
              </div>
            </div>
          </div>
        </section>

        <ServicesGrid compact />
        <ContactBand />
      </main>
    </WpLandingShell>
  );
}

export function ProfileLandingPage() {
  return (
    <WpLandingShell activePage="Profile">
      <main data-elementor-type="wp-page" data-elementor-id="1185" className="elementor elementor-1185">
        <SubpageHero pageId="1185" sectionClass="elementor-element-8030a81" headingClass="elementor-element-9408ba5" title="Profile" />

        <section className="elementor-element elementor-element-e2c4003 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-intro">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-3878c15 e-con-full e-flex e-con e-child">
              <ScrollFade variant="left">
                <Heading className="elementor-element-7d19e0" level={3}>PROFIL PERUSAHAAN</Heading>
                <Heading className="elementor-element-1b719f4">PT. Global Inspeksi Forensik Teknik</Heading>
                <TextWidget className="elementor-element-84e7306">
                  {profileParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </TextWidget>
              </ScrollFade>
            </div>
            <div className="elementor-element elementor-element-3c5575f e-con-full e-flex e-con e-child">
              <ScrollFade variant="right" delay={0.1}>
                <ImageWidget className="elementor-element-6fc82a9" src={profileCompanyImage} alt="Laboratorium GIFT" />
              </ScrollFade>
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-9657776 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-vision">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-751a206 e-con-full e-flex e-con e-child">
              <ScrollFade variant="left">
                <ImageWidget className="elementor-element-fd7e273" src={profileVisionImage} alt="Gedung laboratorium" />
              </ScrollFade>
            </div>
            <div className="elementor-element elementor-element-0876684 e-flex e-con-boxed e-con e-child">
              <ScrollFade variant="right" delay={0.1}>
                <Heading className="elementor-element-3b33a34">VISI</Heading>
                <TextWidget className="elementor-element-76264e8">
                  <p>Menjadi laboratorium pengujian produk beton yang paling dipercaya di Indonesia melalui hasil uji yang akurat, objektif, dan berstandar nasional maupun internasional.</p>
                </TextWidget>
              </ScrollFade>
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-10b14b6 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-mission">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-dbdebb9 e-flex e-con-boxed e-con e-child">
              <ScrollFade variant="left">
                <Heading className="elementor-element-35525b7">MISI</Heading>
                <FeatureList className="elementor-element-f9309dd" />
              </ScrollFade>
            </div>
            <div className="elementor-element elementor-element-4383361 e-con-full e-flex e-con e-child">
              <ScrollFade variant="right" delay={0.1}>
                <ImageWidget className="elementor-element-3edfafc" src={profileMissionImage} alt="Aktivitas pengujian laboratorium" />
              </ScrollFade>
            </div>
          </div>
        </section>

        <PolicySection />
        <ClientStrip />
      </main>
    </WpLandingShell>
  );
}

export function ServicesLandingPage() {
  return (
    <WpLandingShell activePage="Services">
      <main data-elementor-type="wp-page" data-elementor-id="1186" className="elementor elementor-1186">
        <SubpageHero pageId="1186" sectionClass="elementor-element-0580e27" headingClass="elementor-element-f1a85f1" title="Services" />
        <ServicesGrid />
        <section className="elementor-element elementor-element-785ec78 e-flex e-con-boxed e-con e-parent gift-wp-quote">
          <div className="e-con-inner">
            <ScrollFade variant="scale">
              <Heading className="elementor-element-0091782">
                &quot;Uji Kuat Tekan &amp; Uji Material U-Ditch/Box Culvert Dengan Ahli Profesional&quot;
              </Heading>
            </ScrollFade>
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function ServiceDetailLandingPage({
  service,
  image,
}: {
  service: (typeof services)[number];
  image: string;
}) {
  return (
    <WpLandingShell activePage="Services">
      <main data-elementor-type="wp-page" data-elementor-id="1186" className="elementor elementor-1186">
        <SubpageHero pageId="1186" sectionClass="elementor-element-0580e27" headingClass="elementor-element-f1a85f1" title={service.title} />

        <section className="elementor-element elementor-element-e2c4003 e-flex e-con-boxed e-con e-parent gift-wp-section">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-3878c15 e-con-full e-flex e-con e-child">
              <ScrollFade variant="left">
                <ImageWidget className="elementor-element-3edfafc" src={image} alt={service.title} />
              </ScrollFade>
            </div>
            <div className="elementor-element elementor-element-3c5575f e-con-full e-flex e-con e-child">
              <ScrollFade variant="right" delay={0.1}>
                <Heading className="elementor-element-1b719f4">{service.title}</Heading>
                <TextWidget className="elementor-element-84e7306">
                  <p>{service.servicePageDescription}</p>
                  <p>{service.detailParagraph}</p>
                  <ul className="gift-wp-service-points">
                    {service.highlights.map((point) => (
                      <li key={point}>
                        <CheckIcon />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </TextWidget>
                <WpButton className="elementor-element-2e602150 gift-wp-service-cta" href="/services">To our Service</WpButton>
              </ScrollFade>
            </div>
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function ContactLandingPage() {
  return (
    <WpLandingShell activePage="Contact">
      <main data-elementor-type="wp-page" data-elementor-id="1189" className="elementor elementor-1189">
        <SubpageHero pageId="1189" sectionClass="elementor-element-4e53d5c" headingClass="elementor-element-7719ecd" title="Contact" />

        <section className="elementor-element elementor-element-91d42b5 e-flex e-con-boxed e-con e-parent gift-wp-section">
          <div className="e-con-inner">
            <div className="gift-wp-contact-intro">
              <ScrollFade variant="up">
                <Heading className="elementor-element-d5fce67">Contact Info</Heading>
                <TextWidget className="elementor-element-806c177">
                  <p>
                    Hubungi tim kami untuk kebutuhan pengujian, inspeksi, dan verifikasi LHU.
                    Kami siap membantu Anda dengan respons profesional dan terarah.
                  </p>
                </TextWidget>
              </ScrollFade>
            </div>
            <div className="elementor-element elementor-element-67a5229 e-grid e-con-boxed e-con e-child gift-wp-contact-grid">
              {contactCards.map((item, index) => (
                <ScrollFade key={item.title} variant="up" delay={index * 0.08}>
                  <ContactIconBox
                    className={["elementor-element-66ecdbf", "elementor-element-eccc5bd", "elementor-element-4595e59"][index]}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    external={item.external}
                  />
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>

        <ContactBand />

        <section className="elementor-element elementor-element-62d7e54 e-flex e-con-boxed e-con e-parent gift-wp-map">
          <ScrollFade variant="up">
            <iframe
              title="Ruko 91 District BSD No C5, Pagedangan, Tangerang, Banten 15339"
              src="https://maps.google.com/maps?q=Ruko%2091%20District%20BSD%20No%20C5%2C%20Pagedangan%2C%20Tangerang%2C%20Banten%2015339&t=m&z=14&output=embed&iwloc=near"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ScrollFade>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function BlogLandingPage({
  posts = blogPosts,
  selectedCategory,
  allCategories: allCategoriesProp,
}: {
  posts?: BlogCard[];
  selectedCategory?: string;
  allCategories?: string[];
}) {
  const allCategories = allCategoriesProp ?? [
    "All Posts",
    ...Array.from(new Set(blogPosts.map((p) => p.category))),
  ];
  const [featured, ...rest] = posts;
  const isFiltered = selectedCategory && selectedCategory !== "All Posts";

  return (
    <WpLandingShell activePage="Blog">
      <main data-elementor-type="wp-page" data-elementor-id="1156" className="elementor elementor-1156 gift-wp-blog-page">
        <SubpageHero pageId="1156" sectionClass="elementor-element-8030a81" headingClass="elementor-element-9408ba5" title="Blog" />

        <section className="gift-blog-index">
          <div className="gift-blog-wrap">
            <header className="gift-blog-header">
              <ScrollFade variant="up">
                <span className="gift-wp-contact-kicker">Artikel &amp; Berita</span>
                <h2 className="gift-blog-title">Blog &amp; Artikel Terkini</h2>
                <div className="gift-wp-category-row">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat}
                      href={cat === "All Posts" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                      className={
                        cat === (selectedCategory ?? "All Posts")
                          ? "gift-category-active"
                          : ""
                      }
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </ScrollFade>
            </header>

            {posts.length === 0 && (
              <p className="gift-blog-empty">Tidak ada artikel untuk kategori ini.</p>
            )}

            {featured && !isFiltered && (
              <ScrollFade variant="left">
                <Link href={featured.href} className="gift-blog-featured">
                  <div className="gift-blog-featured-img">
                    <img src={featured.image} alt={featured.title} />
                  </div>
                  <div className="gift-blog-featured-body">
                    <span className="gift-blog-tag">{featured.category}</span>
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <div className="gift-blog-featured-meta">
                      <time className="gift-wp-blog-meta">{featured.date}</time>
                      <span className="gift-wp-read-more">Baca Selengkapnya <ArrowRight size={15} /></span>
                    </div>
                  </div>
                </Link>
              </ScrollFade>
            )}

            {(isFiltered ? posts : rest).length > 0 && (
              <>
                {!isFiltered && <h3 className="gift-blog-more-title">Artikel Lainnya</h3>}
                <div className="gift-blog-grid">
                  {(isFiltered ? posts : rest).map((post, index) => (
                    <ScrollFade key={post.href} variant="up" delay={index * 0.05}>
                      <BlogCard post={post} />
                    </ScrollFade>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function BlogDetailLandingPage({ post }: { post: BlogCard & { content?: string } }) {
  return (
    <WpLandingShell activePage="Blog">
      <main data-elementor-type="wp-page" data-elementor-id="1156" className="elementor elementor-1156 gift-wp-blog-page">
        <section className="gift-blog-detail">
          <div className="gift-blog-detail-wrap">
            <Link className="gift-blog-back" href="/blog">
              <ArrowLeft size={15} /> Kembali ke Blog
            </Link>
            <ScrollFade variant="up">
              <article className="gift-blog-article">
                <header className="gift-blog-article-header">
                  <span className="gift-blog-tag">{post.category}</span>
                  <h1>{post.title}</h1>
                  <time className="gift-wp-blog-meta">{post.date}</time>
                </header>
                <img src={post.image} alt={post.title} className="gift-blog-article-cover" />
                {renderArticleContent(post.content || post.excerpt)}
              </article>
            </ScrollFade>
            <div className="gift-blog-detail-nav">
              <Link className="gift-blog-back" href="/blog">
                <ArrowLeft size={15} /> Kembali ke Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

function WpHeader({ activePage }: { activePage: ActivePage }) {
  return (
    <header data-elementor-type="wp-post" data-elementor-id="166" className="elementor elementor-166">
      <div className="elementor-element elementor-element-bdb4fea e-flex e-con-boxed e-con e-parent">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-ae590bd e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-a75d576 wpr-logo-position-center elementor-widget elementor-widget-wpr-logo">
              <div className="elementor-widget-container">
                <Link className="wpr-logo elementor-clearfix" href="/" aria-label="GIFT Laboratory">
                  <picture className="wpr-logo-image">
                    <img src="/landing/logo-gift3.png" alt="GIFT Laboratory" />
                  </picture>
                </Link>
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-927abb3 e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-98c3935 wpr-main-menu-align-right wpr-pointer-underline wpr-pointer-line-fx wpr-nav-menu-bp-mobile wpr-mobile-toggle-v1 elementor-widget elementor-widget-wpr-nav-menu">
              <div className="elementor-widget-container">
                <nav className="wpr-nav-menu-container wpr-nav-menu-horizontal">
                  <ul id="menu-1-98c3935" className="wpr-nav-menu">
                    {navItems.map((item) => (
                      <li key={item.href} className={`menu-item ${item.label === activePage ? "current-menu-item current_page_item" : ""}`}>
                        <Link className={`wpr-menu-item wpr-pointer-item ${item.label === activePage ? "wpr-active-menu-item" : ""}`} href={item.href}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <details className="gift-wp-mobile-menu">
                  <summary aria-label="Menu">
                    <span />
                    <span />
                    <span />
                  </summary>
                  <div>
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                    <Link href="/login">Internal LHU</Link>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function WpFooter() {
  return (
    <footer data-elementor-type="wp-post" data-elementor-id="222" className="elementor elementor-222">
      <div className="gift-footer-wrap">
        <div className="gift-footer-grid">
          <div className="gift-footer-col">
            <ScrollFade variant="left">
              <Link className="wpr-logo elementor-clearfix" href="/">
                <picture className="wpr-logo-image">
                  <img src="/landing/logo-gift-wide.png" alt={company.name} />
                </picture>
              </Link>
              <p className="gift-footer-desc">{company.description}</p>
            </ScrollFade>
          </div>
          <div className="gift-footer-col">
            <ScrollFade variant="up" delay={0.1}>
              <div className="gift-footer-heading">Contact Info</div>
              <ul className="elementor-icon-list-items gift-wp-footer-contact">
                <li className="elementor-icon-list-item">
                  <a className="gift-wp-contact-link" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <PhoneIcon /><span className="elementor-icon-list-text">{company.phone}</span>
                  </a>
                </li>
                <li className="elementor-icon-list-item"><MailIcon /><span className="elementor-icon-list-text">{company.email}</span></li>
                <li className="elementor-icon-list-item"><MapIcon /><span className="elementor-icon-list-text">{company.address}</span></li>
              </ul>
            </ScrollFade>
          </div>
          <div className="gift-footer-col">
            <ScrollFade variant="right" delay={0.2}>
              <div className="gift-footer-heading">Navigasi</div>
              <ul className="elementor-icon-list-items gift-wp-footer-contact">
                {navItems.map((item) => (
                  <li key={item.href} className="elementor-icon-list-item">
                    <Link className="elementor-icon-list-text" href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </ScrollFade>
          </div>
        </div>
        <ScrollFade variant="fade" delay={0.3}>
          <hr className="gift-footer-divider" />
          <p className="gift-footer-copy">© {new Date().getFullYear()} Global Inspeksi Forensik Teknik</p>
        </ScrollFade>
      </div>
    </footer>
  );
}

function ServicesGrid({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <HomeServicesGrid />;
  }

  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-7d185f5 elementor-section-boxed elementor-section-height-default gift-wp-services">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <ScrollFade variant="up">
              <Heading className="elementor-element-5c74249">
                OUR SERVICES
              </Heading>
            </ScrollFade>
            <div className="gift-wp-service-grid">
              {liveOrderedServices.map((service, index) => (
                <ScrollFade key={service.title} variant="up" delay={index * 0.05}>
                  <ServicePromoBox
                    className={`elementor-element-${serviceElementIds[index]}`}
                    image={servicePageImages[index]}
                    title={service.title}
                    description={service.servicePageDescription}
                  />
                </ScrollFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeServicesGrid() {
  return (
    <section className="elementor-element elementor-element-b9accca e-flex e-con-boxed e-con e-parent gift-wp-home-services">
      <div className="e-con-inner">
        <ScrollFade variant="up">
          <Heading className="elementor-element-36ab58f">Layanan Kami</Heading>
        </ScrollFade>
        <div className="gift-wp-home-service-grid">
          {liveOrderedServices.map((service, index) => (
            <ScrollFade key={service.title} variant="up" delay={index * 0.06}>
              <article className="gift-wp-home-service-card">
                <div className="gift-wp-home-service-card-media">
                  <img src={servicePageImages[index]} alt={service.title} />
                </div>
                <div className="gift-wp-home-service-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link className="gift-wp-read-more" href={`/services/${service.slug}`}>
                    Lihat Selengkapnya <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="elementor-element elementor-element-cf5e46f e-flex e-con-boxed e-con e-parent gift-wp-contact-band">
      <div className="e-con-inner gift-wp-two-column">
        <div className="elementor-element elementor-element-5771a84 e-con-full e-flex e-con e-child">
          <ScrollFade variant="left">
            <span className="gift-wp-contact-band-kicker">Get in touch</span>
            <Heading className="elementor-element-5b9f1ae">Hubungi Kami!</Heading>
            <p className="gift-wp-contact-band-copy">
              Konsultasikan kebutuhan pengujian material konstruksi, inspeksi lapangan, atau penerbitan laporan hasil uji bersama tim GIFT Laboratory.
            </p>
            <Heading className="elementor-element-2fa7ae0">Main Office</Heading>
            <Divider className="elementor-element-8725434" />
            <ul className="elementor-icon-list-items gift-wp-contact-list">
              <li>
                <a className="gift-wp-contact-link" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <PhoneIcon /> <span>{company.phone}</span>
                </a>
              </li>
              <li><MailIcon /> <span>{company.email}</span></li>
              <li><MapIcon /> <span>{company.address}</span></li>
            </ul>
            <div className="gift-wp-contact-credentials" aria-label="Company credentials">
              <span><Building2 size={16} /> PT Global Inspeksi Forensik Teknik</span>
            </div>
          </ScrollFade>
        </div>
        <ScrollFade variant="right" delay={0.1}>
          <form className="elementor-element elementor-element-04512b7 elementor-widget elementor-widget-wpr-forms gift-wp-form" action={`mailto:${company.email}`} method="post">
            <div className="gift-wp-form-header">
              <MessageSquareText size={24} />
              <div>
                <strong>Kirim Pertanyaan</strong>
                <span>Tim kami akan menindaklanjuti melalui email resmi.</span>
              </div>
            </div>
            <div className="gift-wp-form-row">
              <label>Name<input suppressHydrationWarning className="wpr-form-field" name="name" placeholder="Nama lengkap" /></label>
              <label>Email<input suppressHydrationWarning className="wpr-form-field" type="email" name="email" placeholder="nama@perusahaan.com" /></label>
            </div>
            <label>Company<input suppressHydrationWarning className="wpr-form-field" name="company" placeholder="Nama perusahaan / instansi" /></label>
            <label>Message<textarea suppressHydrationWarning className="wpr-form-field" name="message" placeholder="Ceritakan kebutuhan pengujian atau inspeksi Anda" rows={7} /></label>
            <button suppressHydrationWarning className="wpr-button" type="submit">Send Message <Send size={16} /></button>
          </form>
        </ScrollFade>
      </div>
    </section>
  );
}

function SubpageHero({
  sectionClass,
  headingClass,
  title,
}: {
  pageId: string;
  sectionClass: string;
  headingClass: string;
  title: string;
}) {
  return (
    <section className={`elementor-element ${sectionClass} e-flex e-con-boxed e-con e-parent gift-wp-subhero`}>
      <div className="e-con-inner">
        <ScrollFade variant="fade">
          <Heading className={headingClass}>{title}</Heading>
        </ScrollFade>
      </div>
    </section>
  );
}

function PolicySection() {
  return (
    <section className="elementor-element elementor-element-2534f23 e-flex e-con-boxed e-con e-parent gift-wp-policy">
      <div className="e-con-inner">
        <ScrollFade variant="up">
        <div className="gift-wp-policy-tabs">
          <input type="radio" name="profile-policy-tabs" id="policy-impartiality" defaultChecked />
          <input type="radio" name="profile-policy-tabs" id="policy-antisouap" />
          <div className="gift-wp-policy-tab-nav">
            <label htmlFor="policy-impartiality">
              <ShieldCheck className="gift-wp-lucide" />
              <span>Kebijakan Ketidakberpihakan</span>
            </label>
            <label htmlFor="policy-antisouap">
              <Handshake className="gift-wp-lucide" />
              <span>Komitmen Anti Suap</span>
            </label>
          </div>
          <article className="gift-wp-policy-panel gift-wp-policy-impartiality">
            <div className="gift-wp-policy-content">
              <div className="gift-wp-policy-copy-column">
                <span className="gift-wp-policy-kicker">Kebijakan</span>
                <h2>Ketidakberpihakan</h2>
                <p>
                  PT Global Inspeksi Forensik Teknik berkomitmen untuk menjaga ketidakberpihakan, independensi, objektivitas, dan integritas dalam seluruh kegiatan pengujian laboratorium dan inspeksi. Seluruh layanan pengujian dan inspeksi dilaksanakan secara profesional, bebas dari tekanan komersial, keuangan, hubungan pribadi, hubungan organisasi, maupun tekanan lain yang dapat mempengaruhi hasil pengujian dan/atau inspeksi. Manajemen puncak memastikan bahwa setiap personel yang terlibat dalam kegiatan pengujian dan inspeksi wajib menjaga objektivitas, menghindari konflik kepentingan, serta tidak menerima intervensi dalam proses maupun hasil pekerjaan. PT Global Inspeksi Forensik Teknik mengidentifikasi, mengevaluasi, mengendalikan, dan meninjau risiko ketidakberpihakan secara berkala untuk memastikan hasil pengujian dan inspeksi tetap akurat, objektif, dan dapat dipercaya.
                </p>
                <p>Tangerang, 7 Mei 2026<br />PT Global Inspeksi Forensik Teknik</p>
                <div className="gift-wp-policy-signature">
                  <strong>Director</strong>
                  <span>Vera Marini</span>
                </div>
              </div>
            </div>
          </article>
          <article className="gift-wp-policy-panel gift-wp-policy-antisouap">
            <div className="gift-wp-policy-content">
              <div className="gift-wp-policy-copy-column">
                <span className="gift-wp-policy-kicker">Komitmen</span>
                <h2>Anti Suap</h2>
                <p>
                  PT Global Inspeksi Forensik Teknik berkomitmen untuk menjalankan seluruh kegiatan pengujian laboratorium dan inspeksi secara jujur, profesional, transparan, independen, dan bebas dari praktik suap. Seluruh personel dilarang meminta, menerima, memberikan, atau menjanjikan uang, hadiah, gratifikasi, fasilitas, atau bentuk imbalan lainnya yang dapat mempengaruhi objektivitas, ketidakberpihakan, dan hasil pengujian maupun inspeksi. Setiap dugaan pelanggaran, benturan kepentingan, gratifikasi, atau praktik suap dapat dilaporkan kepada manajemen perusahaan untuk ditindaklanjuti secara rahasia, objektif, dan bertanggung jawab.
                </p>
                <p>
                  Pelaporan ini dilakukan dengan dukungan data yang relevan dan dimaksudkan untuk kepentingan Perusahaan, tidak dimaksudkan untuk memaksakan seseorang. Pelaporan dapat disampaikan kepada Direktur Global Inspeksi Forensik Teknik atau Bagian Informasi Umum, melalui informasi sebagai berikut:
                </p>
                <ul className="gift-wp-policy-contact-list">
                  <li><strong>Email</strong><span>globalinspeksiforensikteknik@gmail.com</span></li>
                  <li><strong>Telp</strong><span>+62 812-5056-7742</span></li>
                  <li><strong>Site web</strong><span>www.gift-laboratory.com</span></li>
                  <li><strong>Letter</strong><span>PT. Global Inspeksi Forensik Teknik</span></li>
                  <li><strong>Alamat</strong><span>District 91, No C5 BSD, Tangerang</span></li>
                  <li><strong>Alamat</strong><span>Foresta Business Loft 2, Unit 16, Jl.BSD Raya Utama, Tangerang 15339</span></li>
                </ul>
                <p>
                  Pelapor harus memberikan identitas mereka dalam melaporkan keluhan dan memastikan bahwa setiap informasi tentang identitas pihak pelapor dan laporannya dijaga kerahasiaannya. Pelaporan dilakukan di bawah prinsip anonim, rahasia dan independen.
                </p>
                <div className="gift-wp-policy-signature">
                  <strong>Director</strong>
                  <span>Vera marini</span>
                </div>
              </div>
            </div>
          </article>
        </div>
        </ScrollFade>
      </div>
    </section>
  );
}

function ClientStrip() {
  return (
    <section className="elementor-element elementor-element-ec38abd e-flex e-con-boxed e-con e-parent gift-wp-client-strip">
      <div className="e-con-inner">
        <ScrollFade variant="up">
          <Heading className="elementor-element-b891f8c">Our Clients</Heading>
        </ScrollFade>
        <div className="elementor-element elementor-element-974875d e-grid e-con-boxed e-con e-child">
          {clientLogos.map((logo, index) => (
            <ScrollFade key={logo.src} variant="scale" delay={index * 0.04}>
              <img src={logo.src} alt={logo.alt} />
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePromoBox({
  className,
  image,
  title,
  description,
}: {
  className: string;
  image: string;
  title: string;
  description: string;
}) {
  return (
    <article className={`elementor-element ${className} wpr-promo-box-style-cover elementor-widget elementor-widget-wpr-promo-box gift-wp-service-card-anim`}>
      <div className="elementor-widget-container">
        <div className="wpr-promo-box wpr-animation-wrap">
          <div className="wpr-promo-box-image">
            <div className="wpr-promo-box-bg-image wpr-bg-anim-zoom-in wpr-anim-timing-ease-default" style={{ backgroundImage: `url(${image})` }} />
            <div className="wpr-promo-box-bg-overlay wpr-border-anim-oscar" />
          </div>
          <div className="wpr-promo-box-content">
            <h3 className="wpr-promo-box-title"><span>{title}</span></h3>
            <div className="wpr-promo-box-description"><p>{description}</p></div>
            <Link className="wpr-promo-box-btn" href="/contact">
              <span className="wpr-promo-box-btn-text">Hubungi kami</span>
              <span className="wpr-promo-box-btn-icon"><Phone size={14} /></span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function ContactIconBox({
  className,
  icon: Icon,
  title,
  description,
  href,
  external,
}: {
  className: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="elementor-icon-box-icon">
        <span className="elementor-icon"><Icon className="gift-wp-lucide" /></span>
      </div>
      <div className="elementor-icon-box-content">
        <h3 className="elementor-icon-box-title">{title}</h3>
        <p className="elementor-icon-box-description">{description}</p>
      </div>
    </>
  );

  return (
    <article className={`elementor-element ${className} elementor-view-stacked elementor-position-top elementor-widget elementor-widget-icon-box`}>
      <div className="elementor-widget-container">
        {href ? (
          <a
            className="elementor-icon-box-wrapper"
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {content}
          </a>
        ) : (
          <div className="elementor-icon-box-wrapper">{content}</div>
        )}
      </div>
    </article>
  );
}

function BlogCard({ post }: { post: BlogCard }) {
  return (
    <article className="gift-blog-card">
      <Link href={post.href} className="gift-blog-card-img">
        <img src={post.image} alt={post.title} />
      </Link>
      <div className="gift-blog-card-body">
        <span className="gift-blog-tag">{post.category}</span>
        <h2><Link href={post.href}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <div className="gift-blog-card-footer">
          <time className="gift-wp-blog-meta">{post.date}</time>
          <Link className="gift-wp-read-more" href={post.href}>Baca <ArrowRight size={14} /></Link>
        </div>
      </div>
    </article>
  );
}

function FeatureList({ className }: { className: string }) {
  return (
    <div className={`elementor-element ${className} wpr-feature-list-left wpr-feature-list-square wpr-feature-list-line-yes elementor-widget elementor-widget-wpr-feature-list`}>
      <div className="elementor-widget-container">
        <div className="wpr-feature-list-wrap">
          <ul className="wpr-feature-list">
            {missionItems.map((mission) => (
              <li key={mission.title} className="wpr-feature-list-item">
                <div className="wpr-feature-list-icon-wrap">
                  <span className="wpr-feature-list-line" />
                  <div className="wpr-feature-list-icon-inner-wrap"><CheckIcon /></div>
                </div>
                <div className="wpr-feature-list-content-wrap">
                  <h2 className="wpr-feature-list-title">{mission.title}</h2>
                  <p className="wpr-feature-list-description">{mission.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FacilityFeatureList() {
  return (
    <div className="elementor-element elementor-element-1a8878c4 wpr-feature-list-left wpr-feature-list-square wpr-feature-list-line-yes elementor-widget elementor-widget-wpr-feature-list">
      <div className="elementor-widget-container">
        <div className="wpr-feature-list-wrap">
          <ul className="wpr-feature-list">
            {facilities.map((facility, index) => {
              const Icon = facilityIcons[index] ?? CheckIcon;

              return (
                <li key={facility.title} className="wpr-feature-list-item">
                  <div className="wpr-feature-list-icon-wrap">
                    <span className="wpr-feature-list-line" />
                    <div className="wpr-feature-list-icon-inner-wrap"><Icon className="gift-wp-lucide" /></div>
                  </div>
                  <div className="wpr-feature-list-content-wrap">
                    <h2 className="wpr-feature-list-title">{facility.title}</h2>
                    <p className="wpr-feature-list-description">{facility.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Heading({
  className,
  children,
  level = 2,
}: {
  className: string;
  children: ReactNode;
  level?: 2 | 3;
}) {
  const Tag = level === 3 ? "h3" : "h2";
  return (
    <div className={`elementor-element ${className} elementor-widget elementor-widget-heading`}>
      <div className="elementor-widget-container">
        <Tag className="elementor-heading-title elementor-size-default">{children}</Tag>
      </div>
    </div>
  );
}

function TextWidget({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`elementor-element ${className} elementor-widget elementor-widget-text-editor`}>
      <div className="elementor-widget-container">{children}</div>
    </div>
  );
}

function ImageWidget({ className, src, alt }: { className: string; src: string; alt: string }) {
  return (
    <div className={`elementor-element ${className} elementor-widget elementor-widget-image`}>
      <div className="elementor-widget-container">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

function WpButton({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <div className={`elementor-element ${className} wpr-button-icon-position-right wpr-button-icon-style-inline elementor-widget elementor-widget-wpr-button`}>
      <div className="elementor-widget-container">
        <div className="wpr-button-wrap">
          <Link className="wpr-button" href={href}>
            <span className="wpr-button-content">
              <span className="wpr-button-text">{children}</span>
              <span className="wpr-button-icon"><ArrowRight size={18} /></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Divider({ className }: { className: string }) {
  return (
    <div className={`elementor-element ${className} elementor-widget-divider--view-line elementor-widget elementor-widget-divider`}>
      <div className="elementor-widget-container">
        <div className="elementor-divider">
          <span className="elementor-divider-separator" />
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string } = {}) {
  return (
    <svg aria-hidden="true" className={`e-font-icon-svg e-fas-check${className ? ` ${className}` : ""}`} viewBox="0 0 512 512">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

function PhoneIcon() {
  return <Phone className="gift-wp-lucide" />;
}

function MailIcon() {
  return <Mail className="gift-wp-lucide" />;
}

function MapIcon() {
  return <MapPin className="gift-wp-lucide" />;
}

function renderArticleContent(content: string) {
  const lines = content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .split(/\n{1,}/)
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (!listItems.length || !listType) {
      return;
    }

    const Tag = listType;
    const key = `${listType}-${blocks.length}`;
    blocks.push(
      <Tag key={key}>
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Tag>
    );

    listItems = [];
    listType = null;
  };

  lines.forEach((line, index) => {
    if (line === "---") {
      flushList();
      blocks.push(<hr key={`hr-${index}`} />);
      return;
    }

    if (line.startsWith("### ")) {
      flushList();
      blocks.push(<h3 key={`h3-${index}`}>{line.replace(/^###\s+/, "")}</h3>);
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      blocks.push(<h2 key={`h2-${index}`}>{line.replace(/^##\s+/, "")}</h2>);
      return;
    }

    const unordered = line.match(/^-\s+(.+)/);
    if (unordered) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(unordered[1]);
      return;
    }

    const ordered = line.match(/^\d+\.\s+(.+)/);
    if (ordered) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(ordered[1]);
      return;
    }

    flushList();
    blocks.push(<p key={`p-${index}`}>{line}</p>);
  });

  flushList();

  return blocks;
}
