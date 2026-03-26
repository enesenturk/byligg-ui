"use client";

import { useI18n } from "@/providers/i18n-provider";

const cardStyle: React.CSSProperties = {
  background: "var(--theme-bg-card)",
  border: "1px solid var(--theme-border-subtle)",
  borderRadius: 16,
  padding: "2rem",
  transition: "all 0.3s ease",
  cursor: "default",
};

export function Features() {
  const { t } = useI18n();

  const cards = [
    { icon: "⚡", title: t.features.f1Title, desc: t.features.f1Desc },
    { icon: "🌍", title: t.features.f2Title, desc: t.features.f2Desc },
    { icon: "🏆", title: t.features.f3Title, desc: t.features.f3Desc },
    { icon: "📊", title: t.features.f4Title, desc: t.features.f4Desc },
    { icon: "🔔", title: t.features.f5Title, desc: t.features.f5Desc },
    { icon: "🎯", title: t.features.f6Title, desc: t.features.f6Desc },
  ];

  return (
    <section id="features" style={{ minHeight: "100svh", padding: "clamp(2rem, 4vh, 5rem) 2rem", background: "var(--theme-bg-2)", scrollMarginTop: "80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(1.5rem, 3vh, 3rem)" } as React.CSSProperties}>
          <div style={{
            display: "inline-block", padding: "0.4rem 1rem",
            background: "rgba(var(--theme-accent-rgb),0.08)", border: "1px solid rgba(var(--theme-accent-rgb),0.2)",
            borderRadius: 100, fontSize: "0.75rem", fontWeight: 600,
            color: "var(--theme-accent)", textTransform: "uppercase" as const, letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}>
            {t.features.badge}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginBottom: "1rem", color: "var(--theme-text-1)" }}>
            {t.features.title}
          </h2>
          <p style={{ color: "var(--theme-text-2)", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
            {t.features.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {cards.map((card) => (
            <div key={card.title}
              style={cardStyle}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--theme-accent)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--theme-border-subtle)";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: "rgba(var(--theme-accent-rgb),0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", marginBottom: "1.5rem",
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--theme-text-1)" }}>
                {card.title}
              </h3>
              <p style={{ color: "var(--theme-text-2)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
