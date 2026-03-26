"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Ürün", href: "#features" },
  { label: "Fiyatlandırma", href: "#pricing" },
  { label: "Hakkımızda", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        <a href="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8L7 4L11 8L7 12L3 8Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path d="M9 6L13 6L13 10L9 10" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight text-lg">
            byLiGG
          </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
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
