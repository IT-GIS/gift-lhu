import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  FlaskConical,
  Mail,
  MapPin,
  Phone,
  Ship,
  Truck,
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
  href: string;
};

const serviceImages = [
  "/landing/lab-service.png",
  "/landing/blog-konstruksi.png",
  "/landing/blog-workers.png",
  "/landing/blueprint.jpg",
];

const serviceElementIds = ["8bb5804", "e204c3a", "2c75ba7", "ef76db8"];

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
                    <h2 className="elementor-heading-title elementor-size-default">Pengujian Laboratorium &amp; Inspeksi Material</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-37e5df1a elementor-widget elementor-widget-wpr-advanced-text">
                  <div className="elementor-widget-container">
                    <div className="wpr-advanced-text">
                      <span className="wpr-advanced-text-preffix">Pengujian &amp; Inspeksi</span>
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
                <Heading className="elementor-element-5a5959f2">Fasilitas dan Keunggulan</Heading>
                <TextWidget className="elementor-element-97d960d">
                  <p>{company.name} memiliki berbagai fasilitas unggul yang mendukung pengujian kualitas dan keamanan material konstruksi.</p>
                </TextWidget>
                <div className="gift-wp-card-list">
                  {facilities.map((facility) => (
                    <article key={facility.title} className="gift-wp-card">
                      <CheckIcon />
                      <div>
                        <h3>{facility.title}</h3>
                        <p>{facility.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-32158e6e">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ImageWidget className="elementor-element-c360283" src="/landing/blueprint.jpg" alt="Blueprint konstruksi" />
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

        <section className="elementor-element elementor-element-e2c4003 e-flex e-con-boxed e-con e-parent gift-wp-section">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-3878c15 e-con-full e-flex e-con e-child">
              <Heading className="elementor-element-1b719f4">PT. Global Inspeksi Forensik Teknik</Heading>
              <TextWidget className="elementor-element-84e7306">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </TextWidget>
            </div>
            <div className="elementor-element elementor-element-3c5575f e-con-full e-flex e-con e-child">
              <ImageWidget className="elementor-element-6fc82a9" src="/landing/profile-lab.jpeg" alt="Laboratorium GIFT" />
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-9657776 e-flex e-con-boxed e-con e-parent gift-wp-section">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-751a206 e-con-full e-flex e-con e-child">
              <ImageWidget className="elementor-element-fd7e273" src="/landing/about-building.png" alt="Gedung laboratorium" />
            </div>
            <div className="elementor-element elementor-element-0876684 e-flex e-con-boxed e-con e-child">
              <Heading className="elementor-element-3b33a34">VISI</Heading>
              <TextWidget className="elementor-element-76264e8">
                <p>Menjadi laboratorium pengujian produk beton yang paling dipercaya di Indonesia melalui hasil uji yang akurat, objektif, dan berstandar nasional maupun internasional.</p>
              </TextWidget>
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-10b14b6 e-flex e-con-boxed e-con e-parent gift-wp-section">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-dbdebb9 e-flex e-con-boxed e-con e-child">
              <Heading className="elementor-element-35525b7">MISI</Heading>
              <FeatureList className="elementor-element-f9309dd" />
            </div>
            <div className="elementor-element elementor-element-4383361 e-con-full e-flex e-con e-child">
              <ImageWidget className="elementor-element-3edfafc" src="/landing/lab-service.png" alt="Aktivitas pengujian laboratorium" />
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
            <Heading className="elementor-element-d5fce67">Hubungi Kami Kapan Saja!</Heading>
            <TextWidget className="elementor-element-806c177">
              <p>Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut.</p>
            </TextWidget>
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
          <div className="e-con-inner">
            <iframe
              title="Lokasi GIFT Laboratory"
              src="https://www.google.com/maps?q=District%2091%20BSD%20Tangerang&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
              {contentToParagraphs(post.content || post.excerpt).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
      <div className="elementor-element elementor-element-b17e501 e-flex e-con-boxed e-con e-parent">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-e88f5ea e-flex e-con-boxed e-con e-child">
            <div className="e-con-inner gift-wp-footer-grid">
              <div className="elementor-element elementor-element-081556a e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-fc8e9a3 wpr-logo-position-center elementor-widget elementor-widget-wpr-logo">
                  <div className="elementor-widget-container">
                    <Link className="wpr-logo elementor-clearfix" href="/">
                      <picture className="wpr-logo-image">
                        <img src="/landing/logo-gift-wide.png" alt={company.name} />
                      </picture>
                    </Link>
                  </div>
                </div>
                <TextWidget className="elementor-element-50c6494">
                  <p>{company.description}</p>
                </TextWidget>
              </div>
              <div className="elementor-element elementor-element-6bffc18 e-con-full e-flex e-con e-child">
                <Heading className="elementor-element-082d466">Contact Info</Heading>
                <ul className="elementor-icon-list-items gift-wp-footer-contact">
                  <li className="elementor-icon-list-item"><PhoneIcon /> <span className="elementor-icon-list-text">{company.phone}</span></li>
                  <li className="elementor-icon-list-item"><MailIcon /> <span className="elementor-icon-list-text">{company.email}</span></li>
                  <li className="elementor-icon-list-item"><MapIcon /> <span className="elementor-icon-list-text">{company.address}</span></li>
                </ul>
              </div>
              <div className="elementor-element e-con-full e-flex e-con e-child">
                <Heading className="elementor-element-082d466">Navigasi</Heading>
                <ul className="elementor-icon-list-items gift-wp-footer-contact">
                  {navItems.map((item) => (
                    <li key={item.href} className="elementor-icon-list-item">
                      <Link className="elementor-icon-list-text" href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Divider className="elementor-element-d4d0b9f" />
          <div className="elementor-element elementor-element-eb31d96 elementor-widget elementor-widget-text-editor">
            <div className="elementor-widget-container">
              <p>© {new Date().getFullYear()} Global Inspeksi Forensik Teknik</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-7d185f5 elementor-section-boxed elementor-section-height-default gift-wp-services">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <Heading className="elementor-element-5c74249">
              {compact ? "Layanan pengujian dan inspeksi untuk kebutuhan proyek Anda." : "Kami Memberikan Layanan Terbaik Untuk Anda"}
            </Heading>
            <div className="gift-wp-service-grid">
              {liveOrderedServices.map((service, index) => (
                <ServicePromoBox
                  key={service.title}
                  className={`elementor-element-${serviceElementIds[index]}`}
                  image={serviceImages[index]}
                  title={service.title}
                  description={service.servicePageDescription}
                  icon={service.icon}
                />
              ))}
            </div>
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
        <div className="elementor-element elementor-element-5771a84 e-con-full e-flex e-con e-child">
          <Heading className="elementor-element-5b9f1ae">Hubungi Kami Kapan Saja!</Heading>
          <ul className="elementor-icon-list-items gift-wp-contact-list">
            <li><PhoneIcon /> <span>{company.phone}</span></li>
            <li><MailIcon /> <span>{company.email}</span></li>
            <li><MapIcon /> <span>{company.address}</span></li>
          </ul>
        </div>
        <form className="elementor-element elementor-element-04512b7 elementor-widget elementor-widget-wpr-forms gift-wp-form" action={`mailto:${company.email}`} method="post">
          <label>Name<input className="wpr-form-field" name="name" placeholder="Name" /></label>
          <label>Email<input className="wpr-form-field" type="email" name="email" placeholder="Email" /></label>
          <label>Message<textarea className="wpr-form-field" name="message" placeholder="Message" rows={6} /></label>
          <button className="wpr-button" type="submit">Send</button>
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
            <label htmlFor="policy-impartiality">Kebijakan Ketidakberpihakan</label>
            <label htmlFor="policy-antisouap">Komitmen Anti Suap</label>
          </div>
          <article className="gift-wp-policy-panel gift-wp-policy-impartiality">
            <span>Kebijakan</span>
            <h2>Ketidakberpihakan</h2>
            <p>
              Layanan laboratorium pengujian yang diselenggarakan oleh PT. Global Inspeksi Sistem bertujuan
              memastikan kepercayaan pemohon atau klien terhadap produk yang dihasilkan, memenuhi persyaratan SNI,
              serta menjaga setiap personel dari tekanan komersial yang dapat mempengaruhi mutu pelayanan.
            </p>
            <p><strong>Director<br />Vera Marini</strong></p>
          </article>
          <article className="gift-wp-policy-panel gift-wp-policy-antisouap">
            <span>Komitmen</span>
            <h2>Anti Suap</h2>
            <p>
              PT. Global Inspeksi Sistem berkomitmen menjalankan anti-suap dalam layanan sertifikasi, inspeksi,
              dan pengendalian risiko. Setiap pelaporan dilakukan dengan prinsip anonim, rahasia, dan independen
              melalui dukungan data yang relevan.
            </p>
            <p><strong>Director<br />Vera Marini</strong></p>
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
        <Heading className="elementor-element-b891f8c">Our Client</Heading>
        <div className="elementor-element elementor-element-974875d e-grid e-con-boxed e-con e-child">
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
  icon: Icon,
}: {
  className: string;
  image: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <article className={`elementor-element ${className} elementor-widget elementor-widget-wpr-promo-box`}>
      <div className="elementor-widget-container">
        <div className="wpr-promo-box">
          <div className="wpr-promo-box-bg-image" style={{ backgroundImage: `url(${image})` }} />
          <div className="wpr-promo-box-bg-overlay" />
          <div className="wpr-promo-box-content">
            <span className="wpr-promo-box-icon"><Icon className="gift-wp-lucide" /></span>
            <h3 className="wpr-promo-box-title">{title}</h3>
            <p className="wpr-promo-box-description">{description}</p>
            <Link className="wpr-promo-box-btn" href="/contact">
              <span className="wpr-promo-box-btn-text">Hubungi Kami</span>
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

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" viewBox="0 0 512 512">
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

function contentToParagraphs(content: string) {
  return content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .split(/\n{1,}/)
    .map((line) => line.trim())
    .filter(Boolean);
}
