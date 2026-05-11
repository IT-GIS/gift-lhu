import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  company,
  contactCards,
  facilities,
  heroLines,
  missionItems,
  profileParagraphs,
  services,
} from "./landing-data";
import {
  ContactForm,
  ContactItem,
  LandingShell,
  SectionEyebrow,
} from "./landing-shell";

export function LandingPage() {
  return (
    <LandingShell>
      <section className="relative isolate min-h-[690px] overflow-hidden">
        <img
          src="/landing/hero-lab.png"
          alt="Pengujian laboratorium GIFT"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#283778]/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#12182f]/80 via-[#17254d]/55 to-[#17254d]/20" />

        <div className="mx-auto flex min-h-[690px] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
              <span className="h-px w-12 bg-[#2F9BB9]" />
              Pengujian Laboratorium & Inspeksi Material
            </div>

            <h1 className="text-4xl font-semibold leading-[1.08] md:text-6xl lg:text-[65px]">
              Pengujian & Inspeksi
            </h1>

            <div className="mt-4 grid gap-2 text-2xl font-semibold leading-tight text-[#5bd0ea] md:text-4xl">
              {heroLines.map((line, index) => (
                <span
                  key={line}
                  className={index === 0 ? "text-white" : "text-[#5bd0ea]"}
                >
                  {line}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/90 md:text-lg">
              Kami menyediakan layanan pengujian laboratorium dan inspeksi yang
              akurat, terpercaya, dan sesuai standar nasional untuk menjamin
              mutu serta keamanan produk maupun material Anda.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-[4px] bg-[#2F9BB9] px-7 text-base font-semibold hover:bg-[#257f99]"
              >
                <Link href="/services">
                  Lihat Selengkapnya
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-[4px] border-white bg-white/10 px-7 text-base font-semibold text-white hover:bg-white hover:text-[#283778]"
              >
                <Link href="/verify/valid-demo-token">Verifikasi LHU</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-[8px] shadow-2xl shadow-slate-200">
              <img
                src="/landing/about-building.png"
                alt="Gedung laboratorium GIFT"
                className="h-full min-h-[430px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 right-6 hidden max-w-[250px] rounded-[6px] bg-[#2F9BB9] p-6 text-white shadow-xl md:block">
              <BadgeCheck className="mb-4 h-9 w-9" />
              <div className="text-xl font-semibold leading-snug">
                Hasil uji akurat, objektif, dan terdokumentasi.
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow>tentang kami</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#333333] md:text-5xl">
              {company.name}
            </h2>
            <div className="mt-6 space-y-5 text-[15px] font-medium leading-8 text-[#777777]">
              {profileParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild className="rounded-[4px] bg-[#2F9BB9] hover:bg-[#257f99]">
                <Link href="/profile">Lihat Selengkapnya</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-20 text-white lg:px-8">
        <img
          src="/landing/facility-bg.png"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#1C2544]/90" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionEyebrow light>visi</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
              Menjadi laboratorium pengujian produk beton yang paling dipercaya
              di Indonesia.
            </h2>
            <p className="mt-6 text-[15px] font-medium leading-8 text-white/75">
              Melalui hasil uji yang akurat, objektif, dan berstandar nasional
              maupun internasional.
            </p>
          </div>

          <div>
            <SectionEyebrow light>misi</SectionEyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {missionItems.map((mission) => (
                <article
                  key={mission.title}
                  className="rounded-[8px] border border-white/15 bg-white/10 p-6 backdrop-blur"
                >
                  <ShieldCheck className="mb-5 h-8 w-8 text-[#5bd0ea]" />
                  <h3 className="text-xl font-semibold">{mission.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-white/75">
                    {mission.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionEyebrow>Fasilitas dan Keunggulan</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#333333] md:text-5xl">
              Fasilitas yang mendukung pengujian mutu dan keamanan material.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] font-medium leading-8 text-[#777777]">
              {company.name} memiliki berbagai fasilitas unggul yang mendukung
              pengujian kualitas dan keamanan material konstruksi.
            </p>
            <div className="mt-8 grid gap-4">
              {facilities.map((facility) => (
                <div
                  key={facility.title}
                  className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[#e9f7fb] text-[#2F9BB9]">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#333333]">
                        {facility.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-[#777777]">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[8px] shadow-xl shadow-slate-200">
            <img
              src="/landing/blueprint.jpg"
              alt="Kolaborasi teknis di lokasi konstruksi"
              className="h-full min-h-[440px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Layanan Kami</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#333333] md:text-5xl">
              Layanan pengujian dan inspeksi untuk kebutuhan proyek Anda.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2F9BB9] hover:shadow-xl hover:shadow-slate-200"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[4px] bg-[#e9f7fb] text-[#2F9BB9] transition group-hover:bg-[#2F9BB9] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold leading-snug text-[#333333]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-[#777777]">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="mt-5 inline-flex text-sm font-semibold text-[#2F9BB9] hover:text-[#257f99]"
                  >
                    Lihat Selengkapnya
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionEyebrow>Hubungi Kami Kapan Saja!</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#333333] md:text-5xl">
              Tim kami siap membantu kebutuhan Anda setiap saat.
            </h2>
            <p className="mt-6 text-[15px] font-medium leading-8 text-[#777777]">
              Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut.
            </p>

            <div className="mt-8 grid gap-5">
              {contactCards.map((item) => (
                <ContactItem
                  key={item.title}
                  icon={item.icon}
                  label={item.description}
                />
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </LandingShell>
  );
}
