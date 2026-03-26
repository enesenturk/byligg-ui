"use client";

import { useI18n } from "@/providers/i18n-provider";

export function CtaSection() {
  const { t } = useI18n();

  return (
    <section style={{ padding: "6rem 2rem", background: "var(--theme-bg-2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          background: "linear-gradient(135deg, rgba(var(--theme-accent-rgb),0.08), rgba(var(--theme-accent-2-rgb),0.08))",
          border: "1px solid rgba(var(--theme-accent-rgb),0.15)",
          borderRadius: 24, padding: "4rem",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* Rotating glow bg */}
          <div style={{
            position: "absolute", top: "-50%", left: "-50%",
            width: "200%", height: "200%",
            background: "radial-gradient(circle, rgba(var(--theme-accent-rgb),0.05) 0%, transparent 50%)",
            animation: "rotate 20s linear infinite",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-block", padding: "0.4rem 1rem",
              background: "rgba(var(--theme-accent-rgb),0.08)", border: "1px solid rgba(var(--theme-accent-rgb),0.2)",
              borderRadius: 100, fontSize: "0.75rem", fontWeight: 600,
              color: "var(--theme-accent)", textTransform: "uppercase" as const, letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}>
              {t.cta.badge}
            </div>

            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem", color: "var(--theme-text-1)", lineHeight: 1.2 }}>
              {t.cta.title}
            </h2>
            <p style={{ color: "var(--theme-text-2)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 2rem" }}>
              {t.cta.subtitle}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/register" style={{
                padding: "1rem 2.5rem", borderRadius: 8,
                background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
                color: "#fff", fontWeight: 700, fontSize: "1rem",
                textDecoration: "none", transition: "all 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(var(--theme-accent-rgb),0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ""; }}
              >
                {t.cta.button}
              </a>
              <a href="/login" style={{
                padding: "1rem 2.5rem", borderRadius: 8,
                border: "1px solid var(--theme-border-strong)",
                color: "var(--theme-text-2)", fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", transition: "all 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-border-strong)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-text-2)"; }}
              >
                {t.cta.loginLabel} {t.nav.login}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
