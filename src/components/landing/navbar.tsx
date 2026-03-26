"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/providers/i18n-provider";
import { useTheme } from "@/providers/theme-provider";
import { THEMES } from "@/lib/themes";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!themeOpen) return;
    const close = () => setThemeOpen(false);
    // Use setTimeout so the listener isn't triggered by the same click that opened the popover
    const timer = setTimeout(() => window.addEventListener("click", close), 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", close);
    };
  }, [themeOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1rem 2rem",
        background: scrolled ? "rgba(var(--theme-bg-1-rgb),0.85)" : "rgba(var(--theme-bg-1-rgb),0.4)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div
            style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "1rem",
              color: "var(--theme-bg-1)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            bG
          </div>
          <span
            style={{
              fontSize: "1.5rem", fontWeight: 800,
              background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            byLiGG
          </span>
        </a>

        {/* Nav links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}
          className="hidden md:flex">
          {[
            { label: t.nav.features, href: "#features" },
            { label: t.nav.matches, href: "#matches" },
            { label: t.nav.leaderboard, href: "#leaderboard" },
            { label: t.nav.howItWorks, href: "#how-it-works" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{ color: "rgba(180,200,255,0.7)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(180,200,255,0.7)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Lang toggle */}
          <div style={{ display: "flex", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", fontSize: "0.75rem", fontWeight: 600 }}>
            {(["tr", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding: "0.4rem 0.75rem", border: "none", cursor: "pointer",
                  background: lang === l ? "var(--theme-accent)" : "transparent",
                  color: lang === l ? "var(--theme-bg-1)" : "rgba(180,200,255,0.6)",
                  textTransform: "uppercase", transition: "all 0.2s",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >{l}</button>
            ))}
          </div>

          {/* Theme dot */}
          <div style={{ position: "relative" }}>
            <button onClick={(e) => { e.stopPropagation(); setThemeOpen(v => !v); }}
              style={{
                width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span className="rounded-full block" style={{ width: 12, height: 12, background: "var(--theme-accent)" }} />
            </button>
            {themeOpen && (
              <div onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute", right: 0, top: 42, width: 200,
                  background: "var(--theme-bg-card)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, padding: "0.5rem", zIndex: 100,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <p style={{ padding: "0.25rem 0.5rem", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>
                  {t.theme.title}
                </p>
                {THEMES.map((th) => (
                  <button key={th.id} onClick={() => { setTheme(th.id); setThemeOpen(false); }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "0.5rem 0.75rem", borderRadius: 8, border: "none",
                      background: theme === th.id ? "rgba(255,255,255,0.08)" : "transparent",
                      color: theme === th.id ? "#fff" : "rgba(180,200,255,0.6)",
                      cursor: "pointer", fontSize: "0.875rem",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${th.swatch} shrink-0`} />
                    {th.name[lang === "tr" ? "tr" : "en"]}
                  </button>
                ))}
                <button disabled style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "0.5rem 0.75rem", borderRadius: 8, border: "none", background: "transparent", color: "rgba(255,255,255,0.2)", cursor: "not-allowed", fontSize: "0.875rem", fontFamily: "var(--font-inter), sans-serif" }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px dashed rgba(255,255,255,0.2)", flexShrink: 0 }} />
                  <span style={{ textAlign: "left" }}>
                    <span style={{ display: "block" }}>{t.theme.teamColor}</span>
                    <span style={{ fontSize: "0.65rem" }}>{t.theme.teamColorLocked}</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Login */}
          <a href="/login"
            style={{ padding: "0.6rem 1.25rem", borderRadius: 8, border: "none", background: "transparent", color: "rgba(180,200,255,0.7)", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", transition: "color 0.3s", minWidth: 90, textAlign: "center" }}
            className="hidden sm:block"
          >
            {t.nav.login}
          </a>

          {/* CTA */}
          <a href="/register"
            style={{
              padding: "0.6rem 1.5rem", borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
              color: "#fff", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600,
              textDecoration: "none", transition: "all 0.3s", display: "inline-block",
              minWidth: 130, textAlign: "center",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(var(--theme-accent-rgb),0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ""; }}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
