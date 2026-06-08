import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
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
} from "./landing-data";

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

const homeServiceSliderImages = [
  "https://gift-laboratory.com/wp-content/uploads/2025/09/Gemini_Generated_Image_r5u1jjr5u1jjr5u1.png",
  "https://gift-laboratory.com/wp-content/uploads/2025/09/Gemini_Generated_Image_30b2z830b2z830b2.png",
  "https://gift-laboratory.com/wp-content/uploads/2026/01/unnamed-10.jpg",
  "https://gift-laboratory.com/wp-content/uploads/2026/01/unnamed-11.jpg",
];

const facilityIllustration =
  "https://img.freepik.com/premium-photo/flat-2d-illustration-design_759095-88017.jpg?w=740";

const profileCompanyImage =
  "https://gift-laboratory.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-09-24-at-09.12.27-1-remj6nxntomc2lyj4szlsly4lkfrvsc2z8qnikwso0.jpeg";

const profileVisionImage =
  "https://gift-laboratory.com/wp-content/uploads/2025/09/Gemini_Generated_Image_8kqbf28kqbf28kqb.png";

const profileMissionImage =
  "https://gift-laboratory.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-24-at-09.12.32-1.jpeg";

const serviceElementIds = ["8bb5804", "2c75ba7", "e204c3a", "ef76db8"];

const facilityIcons = [UserRound, Award, FlaskConical];

const liveOrderedServices = [
  services[0],
  services[2],
  services[1],
  services[3],
];

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
                <div className="elementor-element elementor-element-dc58416 elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h4 className="elementor-heading-title elementor-size-default">Pengujian Laboratorium &amp; Inspeksi Material</h4>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-top-section elementor-element elementor-element-63a4e9a0 elementor-section-boxed elementor-section-height-default gift-wp-about">
          <div className="elementor-container elementor-column-gap-default gift-wp-two-column">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-57d48a63">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ImageWidget className="elementor-element-5530ede6" src="/landing/about-building.png" alt="Gedung laboratorium GIFT" />
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-6cebff71">
              <div className="elementor-widget-wrap elementor-element-populated">
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
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-top-section elementor-element elementor-element-28c7b67e elementor-section-boxed elementor-section-height-default gift-wp-vision">
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default gift-wp-two-column">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7495d363">
              <div className="elementor-widget-wrap elementor-element-populated">
                <Heading className="elementor-element-7582adce">VISI</Heading>
                <TextWidget className="elementor-element-3a05b207">
                  <p>Menjadi laboratorium pengujian produk beton yang paling dipercaya di Indonesia melalui hasil uji yang akurat, objektif, dan berstandar nasional maupun internasional.</p>
                </TextWidget>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5f082e66">
              <div className="elementor-widget-wrap elementor-element-populated">
                <Heading className="elementor-element-10daaa9">MISI</Heading>
                <FeatureList className="elementor-element-46533381" />
              </div>
            </div>
          </div>
        </section>

        <section className="elementor-section elementor-top-section elementor-element elementor-element-1dc08d92 elementor-section-boxed elementor-section-height-default gift-wp-facilities">
          <div className="elementor-container elementor-column-gap-default gift-wp-two-column">
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5d29a536">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ImageWidget className="elementor-element-5da5c2e gift-wp-facility-illustration" src={facilityIllustration} alt="Ilustrasi fasilitas laboratorium" />
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-32158e6e">
              <div className="elementor-widget-wrap elementor-element-populated">
                <Heading className="elementor-element-5a5959f2" level={3}>Fasilitas dan Keunggulan</Heading>
                <TextWidget className="elementor-element-563e6ef">
                  <p><strong>{company.name}</strong> memiliki berbagai fasilitas unggul yang mendukung pengujian kualitas dan keamanan material konstruksi.</p>
                </TextWidget>
                <FacilityFeatureList />
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
            <div className="elementor-element elementor-element-3878c15 e-con-full e-flex e-con e-child gift-animate-slide-left">
              <Heading className="elementor-element-7d19e0" level={3}>PROFIL PERUSAHAAN</Heading>
              <Heading className="elementor-element-1b719f4">PT. Global Inspeksi Forensik Teknik</Heading>
              <TextWidget className="elementor-element-84e7306">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </TextWidget>
            </div>
            <div className="elementor-element elementor-element-3c5575f e-con-full e-flex e-con e-child gift-animate-slide-right">
              <ImageWidget className="elementor-element-6fc82a9" src={profileCompanyImage} alt="Laboratorium GIFT" />
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-9657776 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-vision">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-751a206 e-con-full e-flex e-con e-child gift-animate-fade-left">
              <ImageWidget className="elementor-element-fd7e273" src={profileVisionImage} alt="Gedung laboratorium" />
            </div>
            <div className="elementor-element elementor-element-0876684 e-flex e-con-boxed e-con e-child gift-animate-slide-right">
              <Heading className="elementor-element-3b33a34">VISI</Heading>
              <TextWidget className="elementor-element-76264e8 gift-animate-fade-right">
                <p>Menjadi laboratorium pengujian produk beton yang paling dipercaya di Indonesia melalui hasil uji yang akurat, objektif, dan berstandar nasional maupun internasional.</p>
              </TextWidget>
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-10b14b6 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-mission">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-dbdebb9 e-flex e-con-boxed e-con e-child gift-animate-slide-left">
              <Heading className="elementor-element-35525b7">MISI</Heading>
              <div className="gift-animate-fade-up">
                <FeatureList className="elementor-element-f9309dd" />
              </div>
            </div>
            <div className="elementor-element elementor-element-4383361 e-con-full e-flex e-con e-child gift-animate-fade-right">
              <ImageWidget className="elementor-element-3edfafc" src={profileMissionImage} alt="Aktivitas pengujian laboratorium" />
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
            <Heading className="elementor-element-0091782">
              &quot;Uji Kuat Tekan &amp; Uji Material U-Ditch/Box Culvert Dengan Ahli Profesional&quot;
            </Heading>
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
              <span className="gift-wp-contact-kicker">Corporate Contact</span>
              <Heading className="elementor-element-d5fce67">Contact Info</Heading>
              <TextWidget className="elementor-element-806c177">
                <p>
                  Hubungi tim kami untuk kebutuhan pengujian, inspeksi, dan verifikasi LHU.
                  Kami siap membantu Anda dengan respons profesional dan terarah.
                </p>
              </TextWidget>
            </div>
            <div className="elementor-element elementor-element-67a5229 e-grid e-con-boxed e-con e-child gift-wp-contact-grid">
              {contactCards.map((item, index) => (
                <ContactIconBox
                  key={item.title}
                  className={["elementor-element-66ecdbf", "elementor-element-eccc5bd", "elementor-element-4595e59"][index]}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        <ContactBand />

        <section className="elementor-element elementor-element-62d7e54 e-flex e-con-boxed e-con e-parent gift-wp-map">
          <iframe
            title="Ruko 91 District BSD No C5, Pagedangan, Tangerang, Banten 15339"
            src="https://maps.google.com/maps?q=Ruko%2091%20District%20BSD%20No%20C5%2C%20Pagedangan%2C%20Tangerang%2C%20Banten%2015339&t=m&z=14&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>
    </WpLandingShell>
  );
}

export function BlogLandingPage({ posts = blogPosts }: { posts?: BlogCard[] }) {
  return (
    <WpLandingShell activePage="Blog">
      <main data-elementor-type="wp-page" data-elementor-id="1156" className="elementor elementor-1156 gift-wp-blog-page">
        <section className="elementor-element elementor-element-8030a81 e-flex e-con-boxed e-con e-parent gift-wp-subhero">
          <div className="e-con-inner">
            <Heading className="elementor-element-9408ba5">Blog</Heading>
          </div>
        </section>
        <section className="gift-wp-section gift-wp-blog-index">
          <div className="e-con-inner">
            <Heading className="elementor-element-d5fce67">Blog &amp; Artikel Terkini</Heading>
            <div className="gift-wp-category-row">
              {blogCategories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
            <div className="gift-wp-blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.href} post={post} />
              ))}
            </div>
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
        <section className="gift-wp-section gift-wp-blog-detail">
          <div className="e-con-inner">
            <p className="gift-wp-blog-meta">{post.category} / {post.date}</p>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <article>
              {renderArticleContent(post.content || post.excerpt)}
            </article>
            <Link className="wpr-button" href="/blog">Kembali ke Blog</Link>
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
            <Link className="wpr-logo elementor-clearfix" href="/">
              <picture className="wpr-logo-image">
                <img src="/landing/logo-gift-wide.png" alt={company.name} />
              </picture>
            </Link>
            <p className="gift-footer-desc">{company.description}</p>
          </div>
          <div className="gift-footer-col">
            <div className="gift-footer-heading">Contact Info</div>
            <ul className="elementor-icon-list-items gift-wp-footer-contact">
              <li className="elementor-icon-list-item"><PhoneIcon /><span className="elementor-icon-list-text">{company.phone}</span></li>
              <li className="elementor-icon-list-item"><MailIcon /><span className="elementor-icon-list-text">{company.email}</span></li>
              <li className="elementor-icon-list-item"><MapIcon /><span className="elementor-icon-list-text">{company.address}</span></li>
            </ul>
          </div>
          <div className="gift-footer-col">
            <div className="gift-footer-heading">Navigasi</div>
            <ul className="elementor-icon-list-items gift-wp-footer-contact">
              {navItems.map((item) => (
                <li key={item.href} className="elementor-icon-list-item">
                  <Link className="elementor-icon-list-text" href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="gift-footer-divider" />
        <p className="gift-footer-copy">© {new Date().getFullYear()} Global Inspeksi Forensik Teknik</p>
      </div>
    </footer>
  );
}

function ServicesGrid({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <HomeServicesSlider />;
  }

  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-7d185f5 elementor-section-boxed elementor-section-height-default gift-wp-services">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <Heading className="elementor-element-5c74249">
              OUR SERVICES
            </Heading>
            <div className="gift-wp-service-grid">
              {liveOrderedServices.map((service, index) => (
                <ServicePromoBox
                  key={service.title}
                  className={`elementor-element-${serviceElementIds[index]}`}
                  image={servicePageImages[index]}
                  title={service.title}
                  description={service.servicePageDescription}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeServicesSlider() {
  return (
    <section className="elementor-element elementor-element-b9accca e-flex e-con-boxed e-con e-parent gift-wp-home-services">
      <div className="e-con-inner">
        <Heading className="elementor-element-36ab58f">Layanan Kami</Heading>
        <div className="gift-wp-home-service-slider" aria-label="Layanan Kami">
          <div className="gift-wp-home-service-track">
            {liveOrderedServices.map((service, index) => {
              const previous = (index + liveOrderedServices.length - 1) % liveOrderedServices.length;
              const next = (index + 1) % liveOrderedServices.length;

              return (
                <article
                  className="gift-wp-home-service-slide"
                  id={`gift-service-slide-${index}`}
                  key={service.title}
                >
                  <div className="gift-wp-home-service-bg" style={{ backgroundImage: `url(${homeServiceSliderImages[index]})` }} />
                  <div className="gift-wp-home-service-overlay" />
                  <div className="gift-wp-home-service-content">
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <Link className="gift-wp-home-service-button" href="/services">Lihat Selengkapnya</Link>
                  </div>
                  <a className="gift-wp-home-service-arrow gift-wp-home-service-prev" href={`#gift-service-slide-${previous}`} aria-label="Layanan sebelumnya">
                    <span aria-hidden="true">‹</span>
                  </a>
                  <a className="gift-wp-home-service-arrow gift-wp-home-service-next" href={`#gift-service-slide-${next}`} aria-label="Layanan berikutnya">
                    <span aria-hidden="true">›</span>
                  </a>
                </article>
              );
            })}
          </div>
          <div className="gift-wp-home-service-dots" aria-hidden="true">
            {liveOrderedServices.map((service, index) => (
              <a href={`#gift-service-slide-${index}`} key={service.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="elementor-element elementor-element-cf5e46f e-flex e-con-boxed e-con e-parent gift-wp-contact-band">
      <div className="e-con-inner gift-wp-two-column">
        <div className="elementor-element elementor-element-5771a84 e-con-full e-flex e-con e-child gift-animate-slide-left">
          <span className="gift-wp-contact-band-kicker">Get in touch</span>
          <Heading className="elementor-element-5b9f1ae">Hubungi Kami!</Heading>
          <p className="gift-wp-contact-band-copy">
            Konsultasikan kebutuhan pengujian material konstruksi, inspeksi lapangan, atau penerbitan laporan hasil uji bersama tim GIFT Laboratory.
          </p>
          <Heading className="elementor-element-2fa7ae0">Main Office</Heading>
          <Divider className="elementor-element-8725434" />
          <ul className="elementor-icon-list-items gift-wp-contact-list">
            <li><PhoneIcon /> <span>{company.phone}</span></li>
            <li><MailIcon /> <span>{company.email}</span></li>
            <li><MapIcon /> <span>{company.address}</span></li>
          </ul>
          <div className="gift-wp-contact-credentials" aria-label="Company credentials">
            <span><Building2 size={16} /> PT Global Inspeksi Forensik Teknik</span>
            <span><ShieldCheck size={16} /> SNI-oriented testing workflow</span>
          </div>
        </div>
        <form className="elementor-element elementor-element-04512b7 elementor-widget elementor-widget-wpr-forms gift-wp-form gift-animate-slide-right" action={`mailto:${company.email}`} method="post">
          <div className="gift-wp-form-header">
            <MessageSquareText size={24} />
            <div>
              <strong>Kirim Pertanyaan</strong>
              <span>Tim kami akan menindaklanjuti melalui email resmi.</span>
            </div>
          </div>
          <div className="gift-wp-form-row">
            <label>Name<input className="wpr-form-field" name="name" placeholder="Nama lengkap" /></label>
            <label>Email<input className="wpr-form-field" type="email" name="email" placeholder="nama@perusahaan.com" /></label>
          </div>
          <label>Company<input className="wpr-form-field" name="company" placeholder="Nama perusahaan / instansi" /></label>
          <label>Message<textarea className="wpr-form-field" name="message" placeholder="Ceritakan kebutuhan pengujian atau inspeksi Anda" rows={7} /></label>
          <button className="wpr-button" type="submit">Send Message <Send size={16} /></button>
        </form>
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
        <Heading className={headingClass}>{title}</Heading>
      </div>
    </section>
  );
}

function PolicySection() {
  return (
    <section className="elementor-element elementor-element-2534f23 e-flex e-con-boxed e-con e-parent gift-wp-policy">
      <div className="e-con-inner">
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
                  <li><strong>Telp</strong><span>+62 812-5065-7742</span></li>
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
      </div>
    </section>
  );
}

function ClientStrip() {
  return (
    <section className="elementor-element elementor-element-ec38abd e-flex e-con-boxed e-con e-parent gift-wp-client-strip">
      <div className="e-con-inner">
        <Heading className="elementor-element-b891f8c">Our Clients</Heading>
        <div className="elementor-element elementor-element-974875d e-grid e-con-boxed e-con e-child gift-animate-fade-up">
          {clientLogos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} />
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
}: {
  className: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <article className={`elementor-element ${className} elementor-view-stacked elementor-position-top elementor-widget elementor-widget-icon-box`}>
      <div className="elementor-widget-container">
        <div className="elementor-icon-box-wrapper">
          <div className="elementor-icon-box-icon">
            <span className="elementor-icon"><Icon className="gift-wp-lucide" /></span>
          </div>
          <div className="elementor-icon-box-content">
            <h3 className="elementor-icon-box-title">{title}</h3>
            <p className="elementor-icon-box-description">{description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogCard({ post }: { post: BlogCard }) {
  return (
    <article className="gift-wp-blog-card">
      <Link href={post.href}><img src={post.image} alt={post.title} /></Link>
      <div>
        <p className="gift-wp-blog-meta">{post.category} / {post.date}</p>
        <h2><Link href={post.href}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link className="gift-wp-read-more" href={post.href}>Read More <ArrowRight size={16} /></Link>
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
