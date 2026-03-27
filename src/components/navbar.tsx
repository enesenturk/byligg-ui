"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoWordmark } from "@/components/brand/logo-wordmark";
import { useI18n } from "@/providers/i18n-provider";
import { getMessage } from "@/lib/constants/language";

const NAV_LINKS = [
  { key: 'navFeatures' as const, href: "#features" },
  { key: 'navPricing' as const, href: "#pricing" },
  { key: 'navAbout' as const, href: "#about" },
  { key: 'navBlog' as const, href: "#blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <LogoWordmark fontSize={26} variant="gradient" />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {getMessage(link.key, lang)}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#login"
            className="hidden sm:block px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Giriş Yap
          </a>
          <a
            href="#signup"
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
          >
            Ücretsiz Başla
          </a>
        </div>
      </nav>
    </header>
  );
}
