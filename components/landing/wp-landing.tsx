"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  ChevronDown,
  ClipboardCheck,
  FileCheck,
  FileSearch,
  Handshake,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  FlaskConical,
} from "lucide-react";
import {
  blogPosts,
  clientLogos,
  company,
  getContactCards,
  getNavItems,
  getOrderedServices,
  getWhatsappLink,
  type NavItem,
} from "./landing-data";
import { useLandingLanguage } from "./landing-language-provider";
import type { LandingDictionary, Locale } from "./i18n/dictionary";
import { ScrollFade } from "./ScrollFade";
import { ContactForm } from "./ContactForm";
import { LandingFlagToggle } from "./landing-flag-toggle";
import { ContactFab } from "./contact-fab";

type ActivePage = "home" | "profile" | "services" | "artikel" | "keluhan-dan-banding" | "contact";

type BlogCard = {
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
  href: string;
};

const facilityIllustration = "/landing/logo-gift3.png";

const profileCompanyImage = "/landing/profile-company.jpeg";

const profileVisionImage = "/landing/profile-vision.png";

const profileMissionImage = "/landing/profile-mission.png";

const serviceElementIds = ["8bb5804", "2c75ba7", "e204c3a", "ef76db8"];

const facilityIcons = [UserRound, Award, FlaskConical];

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
      <ContactFab />
      <WpFooter />
    </>
  );
}

export function HomeLandingPage() {
  const { content } = useLandingLanguage();

  return (
    <WpLandingShell activePage="home">
      <main data-elementor-type="wp-page" data-elementor-id="1184" className="elementor elementor-1184">
        <section className="elementor-section elementor-top-section elementor-element elementor-element-3a538e800 elementor-section-boxed elementor-section-height-default elementor-section-height-default gift-wp-hero">
          <div className="elementor-background-overlay" />
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1d7c6cc8">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="fade">
                  <div className="elementor-element elementor-element-dc58416 elementor-widget elementor-widget-heading">
                    <div className="elementor-widget-container">
                      <h4 className="elementor-heading-title elementor-size-default">{content.hero.title}</h4>
                    </div>
                  </div>
                </ScrollFade>
                <ScrollFade variant="up" delay={0.1}>
                  <div className="elementor-element elementor-element-37e5df1a elementor-widget elementor-widget-wpr-advanced-text">
                    <div className="elementor-widget-container">
                      <div className="wpr-advanced-text">
                        <h1 className="wpr-advanced-text-preffix">{content.hero.prefix}</h1>
                        <span className="wpr-anim-text">
                          {content.hero.lines.map((line) => (
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
                      <p>{content.hero.description}</p>
                    </div>
                  </div>
                  <WpButton className="elementor-element-23044d8" href="/services">
                    {content.hero.cta}
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
                  <Heading className="elementor-element-7d19e0" level={3}>{content.about.kicker}</Heading>
                  <Heading className="elementor-element-effe491">{company.name}</Heading>
                  <TextWidget className="elementor-element-30980496">
                    {content.about.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </TextWidget>
                  <WpButton className="elementor-element-2e602150" href="/profile">
                    {content.about.cta}
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
                  <Heading className="elementor-element-7582adce">{content.vision.heading}</Heading>
                  <TextWidget className="elementor-element-3a05b207">
                    <p>{content.vision.text}</p>
                  </TextWidget>
                </ScrollFade>
              </div>
            </div>
            <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5f082e66">
              <div className="elementor-widget-wrap elementor-element-populated">
                <ScrollFade variant="right" delay={0.1}>
                  <Heading className="elementor-element-10daaa9">{content.mission.heading}</Heading>
                  <FeatureList className="elementor-element-46533381" items={content.mission.items} />
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
                  <Heading className="elementor-element-5a5959f2" level={3}>{content.facilities.heading}</Heading>
                  <TextWidget className="elementor-element-563e6ef">
                    <p><strong>{company.name}</strong> {content.facilities.intro}</p>
                  </TextWidget>
                  <FacilityFeatureList items={content.facilities.items} />
                </ScrollFade>
              </div>
            </div>
          </div>
        </section>

        <ServicesGrid compact />
        <ContactBand sourcePage="home" />
      </main>
    </WpLandingShell>
  );
}

export function ProfileLandingPage() {
  const { content } = useLandingLanguage();

  return (
    <WpLandingShell activePage="profile">
      <main data-elementor-type="wp-page" data-elementor-id="1185" className="elementor elementor-1185">
        <SubpageHero pageId="1185" sectionClass="elementor-element-8030a81" headingClass="elementor-element-9408ba5" title={content.nav.profile} />

        <section className="elementor-element elementor-element-e2c4003 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-intro">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-3878c15 e-con-full e-flex e-con e-child">
              <ScrollFade variant="left">
                <Heading className="elementor-element-7d19e0" level={3}>{content.profile.kicker}</Heading>
                <Heading className="elementor-element-1b719f4">{company.name}</Heading>
                <TextWidget className="elementor-element-84e7306">
                  {content.about.paragraphs.map((paragraph) => (
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
                <Heading className="elementor-element-3b33a34">{content.vision.heading}</Heading>
                <TextWidget className="elementor-element-76264e8">
                  <p>{content.vision.text}</p>
                </TextWidget>
              </ScrollFade>
            </div>
          </div>
        </section>

        <section className="elementor-element elementor-element-10b14b6 e-flex e-con-boxed e-con e-parent gift-wp-section gift-wp-profile-mission">
          <div className="e-con-inner gift-wp-two-column">
            <div className="elementor-element elementor-element-dbdebb9 e-flex e-con-boxed e-con e-child">
              <ScrollFade variant="left">
                <Heading className="elementor-element-35525b7">{content.mission.heading}</Heading>
                <FeatureList className="elementor-element-f9309dd" items={content.mission.items} />
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
  const { content } = useLandingLanguage();

  return (
    <WpLandingShell activePage="services">
      <main data-elementor-type="wp-page" data-elementor-id="1186" className="elementor elementor-1186">
        <SubpageHero pageId="1186" sectionClass="elementor-element-0580e27" headingClass="elementor-element-f1a85f1" title={content.nav.services} />
        <ServicesGrid />
        <section className="elementor-element elementor-element-785ec78 e-flex e-con-boxed e-con e-parent gift-wp-quote">
          <div className="e-con-inner">
            <ScrollFade variant="scale">
              <Heading className="elementor-element-0091782">{content.servicesSection.quote}</Heading>
            </ScrollFade>
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function ServiceDetailLandingPage({
  slug,
  image,
}: {
  slug: string;
  image: string;
}) {
  const { content } = useLandingLanguage();
  const service = content.services.find((s) => s.slug === slug);

  if (!service) return null;

  return (
    <WpLandingShell activePage="services">
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
                <WpButton className="elementor-element-2e602150 gift-wp-service-cta" href="/contact">{content.servicesSection.contactCta}</WpButton>
              </ScrollFade>
            </div>
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function ContactLandingPage() {
  const { content, language } = useLandingLanguage();
  const contactCards = getContactCards(content);

  return (
    <WpLandingShell activePage="contact">
      <main data-elementor-type="wp-page" data-elementor-id="1189" className="elementor elementor-1189">
        <SubpageHero pageId="1189" sectionClass="elementor-element-4e53d5c" headingClass="elementor-element-7719ecd" title={content.nav.contact} />

        <section className="elementor-element elementor-element-91d42b5 e-flex e-con-boxed e-con e-parent gift-wp-section">
          <div className="e-con-inner">
            <div className="gift-wp-contact-intro">
              <ScrollFade variant="up">
                <Heading className="elementor-element-d5fce67">{content.contactPage.kicker}</Heading>
                <TextWidget className="elementor-element-806c177">
                  <p>{content.contactPage.intro}</p>
                </TextWidget>
              </ScrollFade>
            </div>
            <div className="elementor-element elementor-element-67a5229 e-grid e-con-boxed e-con e-child gift-wp-contact-grid">
              {contactCards.map((item, index) => (
                <ScrollFade key={item.key} variant="up" delay={index * 0.08}>
                  <ContactIconBox
                    className={["elementor-element-66ecdbf", "elementor-element-eccc5bd", "elementor-element-4595e59"][index]}
                    icon={item.icon}
                    title={item.title}
                    description={item.key === "phone" ? <PhoneLinks language={language} stacked /> : item.description}
                    href={item.key === "phone" ? undefined : item.href}
                    external={item.external}
                  />
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Office Location Section ===== */}
        <section className="gift-wp-office-location">
          <div className="gift-wp-office-wrap">
            <ScrollFade variant="up">
              <div className="gift-wp-office-header">
                <div className="gift-wp-office-header-left">
                  <h2 className="gift-wp-office-heading">
                    Kunjungi kantor Global Inspeksi Forensik Teknik.
                  </h2>
                </div>
                <div className="gift-wp-office-header-right">
                  <p className="gift-wp-office-desc">
                    PT Global Inspeksi Forensik Teknik adalah laboratorium pengujian
                    konstruksi yang mendukung program pemerintah dalam penerapan
                    Standar Nasional Indonesia (SNI). Kunjungi kantor kami untuk
                    konsultasi pengujian, koordinasi proyek, atau informasi
                    mengenai layanan sertifikasi kami.
                  </p>
                </div>
              </div>
            </ScrollFade>

            <ScrollFade variant="up" delay={0.12}>
              <div className="gift-wp-office-card">
                <div className="gift-wp-office-card-overlay" />
                <div className="gift-wp-office-card-content">
                  <span className="gift-wp-office-pill">HEAD OFFICE</span>
                  <h3 className="gift-wp-office-city">Tangerang</h3>
                  <ul className="gift-wp-office-info-list">
                    <li>
                      <Phone className="gift-wp-lucide" />
                      <PhoneLinks language={language} stacked />
                    </li>
                    <li>
                      <Mail className="gift-wp-lucide" />
                      <span>{company.email}</span>
                    </li>
                    <li>
                      <MapPin className="gift-wp-lucide" />
                      <span>{company.address}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <ContactBand sourcePage="contact" />

        <section className="elementor-element elementor-element-62d7e54 e-flex e-con-boxed e-con e-parent gift-wp-map">
          <ScrollFade variant="up">
            <iframe
              title={company.address}
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

function categoryLabel(category: string, content: LandingDictionary) {
  return category === "All Posts" ? content.blog.allCategoriesLabel : category;
}

const ID_MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/** ICU-independent date formatter — avoids toLocaleDateString() which produces
 *  different output on Node.js small-icu vs browser, causing React error #418. */
function formatBlogDate(value: string, language: Locale): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const months = language === "en" ? EN_MONTHS : ID_MONTHS;
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
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
  const { content, language } = useLandingLanguage();
  const allCategories = allCategoriesProp ?? [
    "All Posts",
    ...Array.from(new Set(blogPosts.map((p) => p.category))),
  ];
  const [featured, ...rest] = posts;
  const isFiltered = selectedCategory && selectedCategory !== "All Posts";

  return (
    <WpLandingShell activePage="artikel">
      <main data-elementor-type="wp-page" data-elementor-id="1156" className="elementor elementor-1156 gift-wp-blog-page">
        <SubpageHero pageId="1156" sectionClass="elementor-element-8030a81" headingClass="elementor-element-9408ba5" title={content.nav.artikel} />

        <section className="gift-blog-index">
          <div className="gift-blog-wrap">
            <header className="gift-blog-header">
              <ScrollFade variant="up">
                <span className="gift-wp-contact-kicker">{content.blog.kicker}</span>
                <h2 className="gift-blog-title">{content.blog.heading}</h2>
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
                      {categoryLabel(cat, content)}
                    </Link>
                  ))}
                </div>
              </ScrollFade>
            </header>

            {posts.length === 0 && (
              <p className="gift-blog-empty">{content.blog.emptyMessage}</p>
            )}

            {featured && !isFiltered && (
              <ScrollFade variant="left">
                <Link href={featured.href} className="gift-blog-featured">
                  <div className="gift-blog-featured-img">
                    <img src={featured.image} alt={featured.title} fetchPriority="high" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/landing/blog-konstruksi.png"; }} />
                  </div>
                  <div className="gift-blog-featured-body">
                    <span className="gift-blog-tag">{featured.category}</span>
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <div className="gift-blog-featured-meta">
                      <time className="gift-wp-blog-meta">{formatBlogDate(featured.date, language)}</time>
                      <span className="gift-wp-read-more">{content.blog.readMoreFeatured} <ArrowRight size={15} /></span>
                    </div>
                  </div>
                </Link>
              </ScrollFade>
            )}

            {(isFiltered ? posts : rest).length > 0 && (
              <>
                {!isFiltered && <h3 className="gift-blog-more-title">{content.blog.moreArticles}</h3>}
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
  const { content, language } = useLandingLanguage();

  return (
    <WpLandingShell activePage="artikel">
      <main data-elementor-type="wp-page" data-elementor-id="1156" className="elementor elementor-1156 gift-wp-blog-page">
        <section className="gift-blog-detail">
          <div className="gift-blog-detail-wrap">
            <Link className="gift-blog-back" href="/blog">
              <ArrowLeft size={15} /> {content.blog.backToBlog}
            </Link>
            <ScrollFade variant="up">
              <article className="gift-blog-article">
                <header className="gift-blog-article-header">
                  <span className="gift-blog-tag">{post.category}</span>
                  <h1>{post.title}</h1>
                  <time className="gift-wp-blog-meta">{formatBlogDate(post.date, language)}</time>
                </header>
                <img src={post.image} alt={post.title} className="gift-blog-article-cover" fetchPriority="high" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/landing/blog-konstruksi.png"; }} />
                {renderArticleContent(post.content || post.excerpt)}
              </article>
            </ScrollFade>
            <div className="gift-blog-detail-nav">
              <Link className="gift-blog-back" href="/blog">
                <ArrowLeft size={15} /> {content.blog.backToBlog}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </WpLandingShell>
  );
}

export function KeluhanBandingLandingPage() {
  const { content } = useLandingLanguage();

  return (
    <WpLandingShell activePage="keluhan-dan-banding">
      <main data-elementor-type="wp-page" data-elementor-id="1160" className="elementor elementor-1160">
        <SubpageHero
          pageId="1160"
          sectionClass="elementor-element-4e53d5c"
          headingClass="elementor-element-7719ecd"
          title={content.keluhanBanding.title}
        />
        <AppealHandlingSection />
      </main>
    </WpLandingShell>
  );
}

const APPEAL_FLOW_ICONS = [UserRound, ClipboardCheck, Users, FileSearch, FileCheck, Mail];

function AppealHandlingSection() {
  const { content, language } = useLandingLanguage();
  const { keluhanBanding } = content;
  const whatsappLink = getWhatsappLink(language);

  return (
    <section className="gift-wp-section gift-appeal-section">
      <div className="e-con-inner">
        <ScrollFade variant="up">
          <div className="gift-appeal-header">
            <h2 className="gift-appeal-title">{keluhanBanding.sectionTitle}</h2>
          </div>
        </ScrollFade>
        <ScrollFade variant="left">
          <div className="gift-appeal-card">
            <div className="gift-appeal-flow-wrap">
              <ul className="gift-appeal-flow">
                {keluhanBanding.flow.map((step, index) => {
                  const Icon = APPEAL_FLOW_ICONS[index] ?? UserRound;
                  const isLast = index === keluhanBanding.flow.length - 1;
                  return (
                    <Fragment key={step.title}>
                      <li className="gift-appeal-flow-item">
                        <div className="gift-appeal-flow-icon-inner">
                          <Icon className="gift-wp-lucide" />
                        </div>
                        <div className="gift-appeal-flow-content">
                          <h3 className="gift-appeal-flow-title">{step.title}</h3>
                        </div>
                      </li>
                      {!isLast && (
                        <li className="gift-appeal-flow-arrow" aria-hidden="true">
                          <span className="gift-appeal-flow-arrow-line" />
                          <ArrowDown />
                        </li>
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </ScrollFade>
        <ScrollFade variant="up">
          <div className="gift-appeal-card gift-appeal-cta-card">
            <div className="gift-appeal-cta-row">
              <WpButton className="elementor-element-appeal-cta gift-appeal-cta-btn" href="/contact">
                {content.servicesSection.contactCta}
              </WpButton>
              <div className="gift-appeal-cta-social">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gift-appeal-cta-icon gift-appeal-cta-icon-wa"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="gift-appeal-cta-icon gift-appeal-cta-icon-mail"
                  aria-label="Email"
                >
                  <Mail className="gift-wp-lucide" />
                </a>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}

function WpHeader({ activePage }: { activePage: ActivePage }) {
  const { content } = useLandingLanguage();
  const navItems = getNavItems(content);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openDropdownNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const closeDropdownSoon = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
    }, 200);
  };

  const pillSurface = isScrolled
    ? "border-white/70 bg-white/90 shadow-glass"
    : "border-white/40 bg-white/70 shadow-[0_12px_40px_rgba(15,23,42,0.06)]";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-4">
        <div
          className={`gift-floating-nav flex min-w-0 flex-1 items-center justify-between gap-3 rounded-full border px-7 py-3 backdrop-blur-xl transition-all duration-300 sm:px-9 ${pillSurface}`}
        >
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={company.shortName}>
          <img
            src="/landing/logo-gift3.png"
            alt={company.shortName}
            className="h-12 w-12 rounded-full object-contain sm:h-14 sm:w-14"
          />
          <span className="hidden whitespace-nowrap text-xl font-bold text-slate-900 sm:inline sm:text-2xl">{company.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = navItemMatches(item, activePage, content);
            if (item.children) {
              const isOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openDropdownNow(item.label)}
                  onMouseLeave={() => closeDropdownSoon(item.label)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((current) => (current === item.label ? null : item.label))}
                    className={`appearance-none border-0 flex items-center gap-1 whitespace-nowrap !rounded-full px-4 py-2.5 text-lg !font-semibold transition focus:outline-none focus-visible:outline-none focus-visible:bg-primary/10 focus-visible:text-primary ${
                      isActive ? "bg-primary/10 text-primary font-semibold" : isOpen ? "bg-primary/10 text-primary font-semibold" : "!text-slate-600 font-semibold hover:bg-primary/10 hover:text-primary"
                    }`}
                    suppressHydrationWarning
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {/* Invisible hover-bridge (pt-2) keeps the cursor over a hoverable box all the way from the
                      button into the panel below, so there's no dead gap that closes the dropdown early. */}
                  <div
                    className={`absolute left-1/2 top-full z-20 w-52 -translate-x-1/2 pt-2 transition-all duration-200 ease-out ${
                      isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-1 opacity-0 pointer-events-none"
                    }`}
                  >
                    <ul className="overflow-hidden rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-glass backdrop-blur-xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block whitespace-nowrap rounded-xl px-3 py-2 text-base font-semibold text-slate-600 transition hover:bg-primary/10 hover:text-primary active:bg-secondary/80 active:text-primary focus:outline-none focus-visible:outline-none focus-visible:bg-primary/10 focus-visible:text-primary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-lg font-semibold transition active:bg-secondary/80 active:text-indigo-500 focus:outline-none focus-visible:outline-none focus-visible:bg-primary/10 focus-visible:text-indigo-500 ${
                  isActive ? "bg-indigo-50 text-indigo-500 font-semibold" : "text-slate-600 hover:bg-primary/10 hover:text-indigo-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={`gift-floating-nav flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300 ${pillSurface}`}>
        <LandingFlagToggle />
        <details className="gift-wp-mobile-menu group relative md:hidden">
          <summary aria-label="Menu">
            <span />
            <span />
            <span />
          </summary>
          <div>
            {navItems.map((item) =>
              item.children ? (
                <Fragment key={item.label}>
                  <span className="gift-mobile-parent">{item.label}</span>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="gift-mobile-child">
                      {child.label}
                    </Link>
                  ))}
                </Fragment>
              ) : (
                <Link key={item.href} href={item.href!}>{item.label}</Link>
              )
            )}
          </div>
        </details>
      </div>
      </div>
    </header>
  );
}

/** Maps a translated nav label back to its stable page key so the active-link
 * highlight keeps working regardless of the current language. */
function navItemMatches(item: NavItem, activePage: ActivePage, content: LandingDictionary) {
  const keyByLabel: Record<string, ActivePage> = {
    [content.nav.home]: "home",
    [content.nav.profile]: "profile",
    [content.nav.services]: "services",
    [content.nav.artikel]: "artikel",
    [content.nav.keluhanDanBanding]: "keluhan-dan-banding",
    [content.nav.contact]: "contact",
  };
  if (keyByLabel[item.label] === activePage) return true;
  return item.children?.some((c) => keyByLabel[c.label] === activePage) ?? false;
}

function WpFooter() {
  const { content, language } = useLandingLanguage();
  const navItems = getNavItems(content);

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
              <p className="gift-footer-desc">{content.companyDescription}</p>
              <div className="gift-footer-social">
                <a
                  href="https://www.instagram.com/ptglobalinspeksiforensikteknik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gift-footer-social-link"
                  aria-label="Instagram"
                >
                  <Instagram className="gift-wp-lucide" />
                </a>
              </div>
            </ScrollFade>
          </div>
          <div className="gift-footer-col">
            <ScrollFade variant="up" delay={0.1}>
              <div className="gift-footer-heading">{content.footer.contactInfo}</div>
              <ul className="elementor-icon-list-items gift-wp-footer-contact">
                <li className="elementor-icon-list-item">
                  <PhoneIcon /><span className="elementor-icon-list-text"><PhoneLinks language={language} /></span>
                </li>
                <li className="elementor-icon-list-item"><MailIcon /><span className="elementor-icon-list-text">{company.email}</span></li>
                <li className="elementor-icon-list-item"><MapIcon /><span className="elementor-icon-list-text">{company.address}</span></li>
              </ul>
            </ScrollFade>
          </div>
          <div className="gift-footer-col">
            <ScrollFade variant="right" delay={0.2}>
              <div className="gift-footer-heading">{content.footer.navigation}</div>
              <ul className="elementor-icon-list-items gift-wp-footer-contact">
                {navItems.flatMap((item) =>
                  item.children
                    ? item.children.map((child) => (
                        <li key={child.href} className="elementor-icon-list-item">
                          <Link className="elementor-icon-list-text" href={child.href}>{child.label}</Link>
                        </li>
                      ))
                    : [
                        <li key={item.href} className="elementor-icon-list-item">
                          <Link className="elementor-icon-list-text" href={item.href!}>{item.label}</Link>
                        </li>,
                      ]
                )}
              </ul>
            </ScrollFade>
          </div>
        </div>
        <ScrollFade variant="fade" delay={0.3}>
          <hr className="gift-footer-divider" />
          <p className="gift-footer-copy" suppressHydrationWarning>© {new Date().getFullYear()} Global Inspeksi Forensik Teknik</p>
        </ScrollFade>
      </div>
    </footer>
  );
}

function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const { content } = useLandingLanguage();

  if (compact) {
    return <HomeServicesGrid />;
  }

  const orderedServices = getOrderedServices(content);

  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-7d185f5 elementor-section-boxed elementor-section-height-default gift-wp-services">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <ScrollFade variant="up">
              <Heading className="elementor-element-5c74249">
                {content.servicesSection.heading}
              </Heading>
            </ScrollFade>
            <div className="gift-wp-service-grid">
              {orderedServices.map((service, index) => (
                <ScrollFade key={service.title} variant="up" delay={index * 0.05}>
                  <ServicePromoBox
                    className={`elementor-element-${serviceElementIds[index]}`}
                    image={service.image}
                    title={service.title}
                    description={service.servicePageDescription}
                    cta={content.servicesSection.promoCta}
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
  const { content } = useLandingLanguage();
  const orderedServices = getOrderedServices(content);

  return (
    <section className="elementor-element elementor-element-b9accca e-flex e-con-boxed e-con e-parent gift-wp-home-services">
      <div className="e-con-inner">
        <ScrollFade variant="up">
          <Heading className="elementor-element-36ab58f">{content.homeServices.heading}</Heading>
        </ScrollFade>
        <div className="gift-wp-home-service-grid">
          {orderedServices.map((service, index) => (
            <ScrollFade key={service.title} variant="up" delay={index * 0.06}>
              <article className="gift-wp-home-service-card">
                <div className="gift-wp-home-service-card-media">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="gift-wp-home-service-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link className="gift-wp-read-more" href={`/services/${service.slug}`}>
                    {content.homeServices.readMore} <ArrowRight size={16} />
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

function ContactBand({ sourcePage }: { sourcePage: "home" | "contact" }) {
  const { content, language } = useLandingLanguage();

  return (
    <section className="elementor-element elementor-element-cf5e46f e-flex e-con-boxed e-con e-parent gift-wp-contact-band">
      <div className="e-con-inner gift-wp-two-column">
        <div className="elementor-element elementor-element-5771a84 e-con-full e-flex e-con e-child">
          <ScrollFade variant="left">
            <span className="gift-wp-contact-band-kicker">{content.contactBand.kicker}</span>
            <Heading className="elementor-element-5b9f1ae">{content.contactBand.heading}</Heading>
            <p className="gift-wp-contact-band-copy">
              {content.contactBand.copy}
            </p>
            <Heading className="elementor-element-2fa7ae0">{content.contactBand.officeHeading}</Heading>
            <Divider className="elementor-element-8725434" />
            <ul className="elementor-icon-list-items gift-wp-contact-list">
              <li>
                <PhoneIcon /> <PhoneLinks language={language} stacked={sourcePage === "contact"} />
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
          <ContactForm sourcePage={sourcePage} />
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
        <Heading className={headingClass}>{title}</Heading>
      </div>
    </section>
  );
}

function PolicySection() {
  const { content } = useLandingLanguage();
  const { policy } = content;

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
              <span>{policy.tabImpartiality}</span>
            </label>
            <label htmlFor="policy-antisouap">
              <Handshake className="gift-wp-lucide" />
              <span>{policy.tabAntiBribery}</span>
            </label>
          </div>
          <article className="gift-wp-policy-panel gift-wp-policy-impartiality">
            <div className="gift-wp-policy-content">
              <div className="gift-wp-policy-copy-column">
                <span className="gift-wp-policy-kicker">{policy.impartialityKicker}</span>
                <h2>{policy.impartialityTitle}</h2>
                <p>{policy.impartialityBody}</p>
                <p>{policy.signatureLocationDate}<br />PT Global Inspeksi Forensik Teknik</p>
                <div className="gift-wp-policy-signature">
                  <strong>{policy.directorLabel}</strong>
                  <span>Vera Marini</span>
                </div>
              </div>
            </div>
          </article>
          <article className="gift-wp-policy-panel gift-wp-policy-antisouap">
            <div className="gift-wp-policy-content">
              <div className="gift-wp-policy-copy-column">
                <span className="gift-wp-policy-kicker">{policy.antiBriberyKicker}</span>
                <h2>{policy.antiBriberyTitle}</h2>
                <p>{policy.antiBriberyBody1}</p>
                <p>{policy.antiBriberyBody2}</p>
                <ul className="gift-wp-policy-contact-list">
                  <li><strong>{policy.contactLabels.email}</strong><span>globalinspeksiforensikteknik@gmail.com</span></li>
                  <li><strong>{policy.contactLabels.phone}</strong><span>+62 812-5056-7742</span></li>
                  <li><strong>{policy.contactLabels.website}</strong><span>www.gift-laboratory.com</span></li>
                  <li><strong>{policy.contactLabels.letter}</strong><span>PT. Global Inspeksi Forensik Teknik</span></li>
                  <li><strong>{policy.contactLabels.address}</strong><span>District 91, No C5 BSD, Tangerang</span></li>
                  <li><strong>{policy.contactLabels.address}</strong><span>Foresta Business Loft 2, Unit 16, Jl.BSD Raya Utama, Tangerang 15339</span></li>
                </ul>
                <p>{policy.closingNote}</p>
                <div className="gift-wp-policy-signature">
                  <strong>{policy.directorLabel}</strong>
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
  const { content } = useLandingLanguage();

  return (
    <section className="elementor-element elementor-element-ec38abd e-flex e-con-boxed e-con e-parent gift-wp-client-strip">
      <div className="e-con-inner">
        <ScrollFade variant="up">
          <Heading className="elementor-element-b891f8c">{content.clients.heading}</Heading>
        </ScrollFade>
        <div className="gift-wp-client-marquee">
          <div className="gift-wp-client-track">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <img
                key={`${logo.src}-${index}`}
                src={logo.src}
                alt={logo.alt}
                style={logo.large ? { maxHeight: "130px" } : undefined}
              />
            ))}
          </div>
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
  cta,
}: {
  className: string;
  image: string;
  title: string;
  description: string;
  cta: string;
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
              <span className="wpr-promo-box-btn-text">{cta}</span>
              <span className="wpr-promo-box-btn-icon"><Phone size={14} /></span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function PhoneLinks({ language, stacked = false }: { language: Locale; stacked?: boolean }) {
  const link = getWhatsappLink(language, company.whatsapp);

  return (
    <span className={stacked ? "gift-wp-contact-phone-lines" : undefined}>
      <a href={link} target="_blank" rel="noopener noreferrer">{company.phone}</a>
    </span>
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
  description: ReactNode;
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
  const { content, language } = useLandingLanguage();

  return (
    <article className="gift-blog-card">
      <Link href={post.href} className="gift-blog-card-img">
        <img src={post.image} alt={post.title} loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = "/landing/blog-konstruksi.png"; }} />
      </Link>
      <div className="gift-blog-card-body">
        <span className="gift-blog-tag">{post.category}</span>
        <h2><Link href={post.href}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <div className="gift-blog-card-footer">
          <time className="gift-wp-blog-meta">{formatBlogDate(post.date, language)}</time>
          <Link className="gift-wp-read-more" href={post.href}>{content.blog.readMoreCard} <ArrowRight size={14} /></Link>
        </div>
      </div>
    </article>
  );
}

function FeatureList({ className, items }: { className: string; items: { title: string; description: string }[] }) {
  return (
    <div className={`elementor-element ${className} wpr-feature-list-left wpr-feature-list-square wpr-feature-list-line-yes elementor-widget elementor-widget-wpr-feature-list`}>
      <div className="elementor-widget-container">
        <div className="wpr-feature-list-wrap">
          <ul className="wpr-feature-list">
            {items.map((mission) => (
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

function FacilityFeatureList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="elementor-element elementor-element-1a8878c4 wpr-feature-list-left wpr-feature-list-square wpr-feature-list-line-yes elementor-widget elementor-widget-wpr-feature-list">
      <div className="elementor-widget-container">
        <div className="wpr-feature-list-wrap">
          <ul className="wpr-feature-list">
            {items.map((facility, index) => {
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.149.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.05-.52-.099-.149-.668-1.612-.917-2.207-.242-.579-.487-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.03 3.1 4.927 4.224 2.898 1.123 2.898.748 3.421.7.523-.049 1.758-.72 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.741 1.464h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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

