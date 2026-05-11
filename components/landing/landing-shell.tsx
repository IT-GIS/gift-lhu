import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, navItems } from "./landing-data";

export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <main
      className="min-h-screen bg-white text-[#333333]"
      style={{
        fontFamily:
          "Poppins, Montserrat, Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="GIFT Laboratory">
          <img
            src="/landing/logo-gift3.png"
            alt="GIFT Laboratory"
            className="h-14 w-20 object-contain"
          />
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold uppercase tracking-wide text-[#2f3a4a]">
              {company.shortName}
            </div>
            <div className="text-xs font-medium text-[#2F9BB9]">
              Laboratory & Inspection
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#333333] lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#2F9BB9]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden rounded-[4px] bg-[#2F9BB9] px-5 hover:bg-[#257f99] sm:inline-flex"
          >
            <Link href="/login">
              Internal LHU
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <details className="group relative lg:hidden">
            <summary className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-[4px] border border-slate-200 text-[#2F9BB9] [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </summary>
            <div className="absolute right-0 mt-3 grid w-56 gap-1 rounded-[6px] border border-slate-200 bg-white p-3 text-sm font-semibold text-[#333333] shadow-xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[4px] px-3 py-2 hover:bg-[#e9f7fb] hover:text-[#2F9BB9]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="mt-1 rounded-[4px] bg-[#2F9BB9] px-3 py-2 text-white hover:bg-[#257f99]"
              >
                Internal LHU
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1C2544] px-5 py-12 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <img
            src="/landing/logo-gift-wide.png"
            alt={company.name}
            className="h-20 w-52 object-contain object-left"
          />
          <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/70">
            {company.description}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Navigasi</h3>
          <div className="mt-4 grid gap-3 text-sm font-medium text-white/70">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#5bd0ea]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Contact Info</h3>
          <div className="mt-4 grid gap-3 text-sm font-medium text-white/70">
            <span>{company.phone}</span>
            <span>{company.email}</span>
            <span>{company.address}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm font-medium text-white/55">
        &copy; {new Date().getFullYear()} Global Inspeksi Forensik Teknik.
      </div>
    </footer>
  );
}

export function SectionEyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${
        light ? "text-[#5bd0ea]" : "text-[#2F9BB9]"
      }`}
    >
      <span className={`h-px w-10 ${light ? "bg-[#5bd0ea]" : "bg-[#2F9BB9]"}`} />
      {children}
    </div>
  );
}

export function SubpageHero({ title }: { title: string }) {
  return (
    <section className="relative isolate flex min-h-[351px] items-center overflow-hidden px-5 py-20 text-white lg:px-8">
      <img
        src="/landing/subpage-cover.jpg"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[#354661]/70" />
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

export function ContactForm({ dark = false }: { dark?: boolean }) {
  return (
    <form
      action={`mailto:${company.email}`}
      method="post"
      className={dark ? "grid gap-5" : "rounded-[8px] border border-slate-200 bg-[#f7f9fc] p-6 shadow-sm md:p-8"}
    >
      <div className="grid gap-5">
        <FormField label="Name" name="name" dark={dark} />
        <FormField label="Email" name="email" type="email" dark={dark} />
        <label className={`grid gap-2 text-sm font-semibold ${dark ? "text-white" : "text-[#333333]"}`}>
          Message
          <textarea
            name="message"
            rows={6}
            className="rounded-[4px] border border-slate-200 bg-white px-4 py-3 text-sm text-[#333333] outline-none transition focus:border-[#2F9BB9] focus:ring-2 focus:ring-[#2F9BB9]/15"
            placeholder="Message"
          />
        </label>
        <Button
          type="submit"
          className="h-12 rounded-[4px] bg-[#2F9BB9] text-base font-semibold hover:bg-[#257f99]"
        >
          Send
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}

export function ContactItem({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex gap-4 text-[15px] font-medium leading-7 text-[#777777]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-[#e9f7fb] text-[#2F9BB9]">
        <Icon className="h-5 w-5" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  dark,
}: {
  label: string;
  name: string;
  type?: string;
  dark: boolean;
}) {
  return (
    <label className={`grid gap-2 text-sm font-semibold ${dark ? "text-white" : "text-[#333333]"}`}>
      {label}
      <input
        name={name}
        type={type}
        className="h-12 rounded-[4px] border border-slate-200 bg-white px-4 text-sm text-[#333333] outline-none transition focus:border-[#2F9BB9] focus:ring-2 focus:ring-[#2F9BB9]/15"
        placeholder={label}
      />
    </label>
  );
}
