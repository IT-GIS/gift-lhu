"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#verification", label: "Verification" },
  { href: "#contact", label: "Contact" },
];

export function MarketingNav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-glow">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">LHU Verification System</div>
            <div className="text-xs text-muted-foreground">Concrete Compression Reports</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild className="hidden sm:inline-flex">
            <Link href="#contact">Request Demo</Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
