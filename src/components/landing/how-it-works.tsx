"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/providers/i18n-provider";

const STEPS = [
  { num: "01", emoji: "👤", titleKey: "s1Title", descKey: "s1Desc" },
  { num: "02", emoji: "⚽", titleKey: "s2Title", descKey: "s2Desc" },
  { num: "03", emoji: "🎯", titleKey: "s3Title", descKey: "s3Desc" },
  { num: "04", emoji: "⭐", titleKey: "s4Title", descKey: "s4Desc" },
] as const;

const NAVBAR = 80;
const SECTION_PAD = 64; // 2rem * 2

export function HowItWorks() {
  const { t } = useI18n();
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [paddingTop, setPaddingTop] = useState(100);
  const [paddingBottom, setPaddingBottom] = useState(250);
  const iconSize = 80;
  const borderRadius = 20;
  const fontSize = 32;

  useEffect(() => {
    const calc = () => {
      const headerH = headerRef.current?.offsetHeight ?? 100;
      const stepsH = stepsRef.current?.offsetHeight ?? 200;
      const ctaH = ctaRef.current?.offsetHeight ?? 90;
      const contentH = headerH + stepsH + ctaH;
      const sectionH = window.innerHeight - NAVBAR - SECTION_PAD;
      const extra = Math.max(0, sectionH - contentH);
      // 2:7 ratio (≈100:250)
      setPaddingTop(Math.round(extra * (2 / 9)));
      setPaddingBottom(Math.round(extra * (7 / 9)));
    };
    const timer = setTimeout(calc, 50);
    window.addEventListener("resize", calc);
    return () => { clearTimeout(timer); window.removeEventListener("resize", calc); };
  }, []);

  return (
    <section id="how-it-works" style={{ minHeight: "100svh", padding: "2rem", background: "var(--theme-bg-1)", scrollMarginTop: "80px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column", paddingTop, paddingBottom }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-block", padding: "0.3rem 0.9rem",
            background: "rgba(var(--theme-accent-rgb),0.08)", border: "1px solid rgba(var(--theme-accent-rgb),0.2)",
            borderRadius: 100, fontSize: "0.7rem", fontWeight: 600,
            color: "var(--theme-accent)", textTransform: "uppercase" as const, letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}>
            {t.howItWorks.badge}
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.4rem", color: "#fff" }}>
            {t.howItWorks.title}
          </h2>
          <p style={{ color: "rgba(180,200,255,0.6)", fontSize: "clamp(0.85rem, 1.2vw, 1rem)", maxWidth: 560, margin: "0 auto" }}>
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(1rem, 2vw, 2rem)",
          alignItems: "center",
        }}>
          {STEPS.map((step) => {
            const title = t.howItWorks[step.titleKey];
            const desc = t.howItWorks[step.descKey];
            return (
              <div key={step.num}
                style={{ textAlign: "center", position: "relative" }}
                onMouseEnter={e => {
                  const el = (e.currentTarget as HTMLDivElement).querySelector(".step-num") as HTMLDivElement | null;
                  if (el) { el.style.borderColor = "var(--theme-accent)"; el.style.transform = "scale(1.08)"; el.style.boxShadow = "0 0 30px rgba(var(--theme-accent-rgb),0.15)"; }
                }}
                onMouseLeave={e => {
                  const el = (e.currentTarget as HTMLDivElement).querySelector(".step-num") as HTMLDivElement | null;
                  if (el) { el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.transform = ""; el.style.boxShadow = ""; }
                }}
              >
                <div className="step-num" style={{
                  width: iconSize, height: iconSize,
                  background: "var(--theme-bg-card)",
                  border: "2px solid rgba(255,255,255,0.07)",
                  borderRadius: borderRadius,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 0.75rem",
                  fontSize: fontSize,
                  position: "relative", zIndex: 1,
                  transition: "all 0.3s ease",
                }}>
                  {step.emoji}
                  <span style={{
                    position: "absolute", top: -7, right: -7,
                    width: 20, height: 20, borderRadius: "50%",
                    background: "var(--theme-accent)", color: "var(--theme-bg-1)",
                    fontSize: "0.6rem", fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {step.num.replace("0", "")}
                  </span>
                </div>
                <h3 style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)", fontWeight: 700, marginBottom: "0.3rem", color: "#fff" }}>
                  {title}
                </h3>
                <p style={{ color: "rgba(180,200,255,0.55)", fontSize: "clamp(0.78rem, 0.95vw, 0.875rem)", lineHeight: 1.5, margin: 0 }}>
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Compact CTA */}
        <div ref={ctaRef} style={{
          marginTop: "4rem",
          background: "linear-gradient(135deg, rgba(var(--theme-accent-rgb),0.07), rgba(var(--theme-accent-2-rgb),0.07))",
          border: "1px solid rgba(var(--theme-accent-rgb),0.15)",
          borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1.5rem", flexWrap: "wrap",
          position: "relative", overflow: "hidden",
          boxSizing: "border-box",
          padding: "25px"
        }}>
          <div style={{ position: "absolute", top: "-60%", right: "-10%", width: "35%", paddingBottom: "35%", borderRadius: "50%", background: "radial-gradient(circle, rgba(var(--theme-accent-rgb),0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>
              {t.cta.title}
            </div>
            <div style={{ color: "rgba(180,200,255,0.6)", fontSize: "clamp(0.8rem, 1vw, 0.9rem)" }}>
              {t.cta.subtitle}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, position: "relative", zIndex: 1 }}>
            <a href="/register" style={{
              padding: "0.7rem 1.75rem", borderRadius: 8,
              background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
              color: "#fff", fontWeight: 700, fontSize: "0.9rem",
              textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(var(--theme-accent-rgb),0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ""; }}
            >
              {t.cta.button}
            </a>
            <a href="/login" style={{
              padding: "0.7rem 1.5rem", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(180,200,255,0.75)", fontWeight: 600, fontSize: "0.875rem",
              textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,200,255,0.75)"; }}
            >
              {t.cta.loginLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
