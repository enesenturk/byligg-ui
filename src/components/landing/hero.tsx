"use client";

import { useI18n } from "@/providers/i18n-provider";
import { LogoWordmark } from "@/components/brand/logo-wordmark";

function Particles() {
  const particlePositions = [
    { top: "20%", left: "8%" }, { top: "60%", left: "12%" },
    { top: "35%", left: "82%" }, { top: "75%", left: "78%" },
    { top: "15%", left: "55%" }, { top: "85%", left: "38%" },
  ];

  const particleStyle = {
    position: "absolute" as const,
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "rgba(var(--theme-accent-rgb),0.6)",
    boxShadow: "0 0 8px rgba(var(--theme-accent-rgb),0.8)",
    pointerEvents: "none" as const,
  };

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none"
    }}>
      {particlePositions.map((pos, i) => (
        <div
          key={i}
          style={{
            ...particleStyle,
            top: pos.top,
            left: pos.left,
            animation: `pulse ${2.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

interface HeroProps {
  onOpenRegister: () => void;
}

export function Hero({ onOpenRegister }: HeroProps) {
  const { t } = useI18n();

  const sectionStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    padding: "8rem 2rem 8rem",
    overflow: "hidden",
  };

  const backgroundStyle = {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: "url('/stadium.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.3) saturate(0.6)",
    pointerEvents: "none" as const,
  };

  const overlayStyle = {
    position: "absolute" as const,
    inset: 0,
    background: `
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--theme-accent-rgb),0.15), transparent),
      radial-gradient(ellipse 60% 40% at 80% 60%, rgba(var(--theme-accent-2-rgb),0.12), transparent),
      linear-gradient(180deg, var(--theme-bg-hero) 0%, rgba(var(--theme-bg-hero-rgb),0.9) 50%, var(--theme-bg-hero) 100%)
    `,
    pointerEvents: "none" as const,
  };

  const gridStyle = {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
    pointerEvents: "none" as const,
  };

  const contentStyle = {
    position: "relative" as const,
    zIndex: 10,
    maxWidth: 1000,
    textAlign: "center" as const,
    width: "100%",
  };

  const logoStyle = {
    margin: 0,
    marginBottom: "0.5rem",
    lineHeight: 1,
    filter: "drop-shadow(0 0 40px rgba(var(--theme-accent-rgb),0.2))",
  };

  const taglineStyle = {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    color: "var(--theme-text-3)",
    marginBottom: "1.5rem",
  };

  const dividerStyle = {
    width: 80,
    height: 1,
    margin: "0 auto 2rem",
    background: "linear-gradient(90deg, transparent, var(--theme-accent), transparent)",
  };

  const headlineStyle = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 900,
    color: "var(--theme-text-1)",
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    marginBottom: "1.25rem",
  };

  const subtitleStyle = {
    fontSize: "1.1rem",
    color: "var(--theme-text-2)",
    maxWidth: 560,
    margin: "0 auto 2.5rem",
    lineHeight: 1.7,
  };

  const ctaContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap" as const,
    marginBottom: "4rem",
  };

  const primaryButtonStyle = {
    padding: "1rem 2rem",
    borderRadius: 100,
    border: "none",
    background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 24px rgba(var(--theme-accent-rgb),0.4)",
    transition: "all 0.3s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "var(--font-inter), sans-serif",
  };

  const secondaryButtonStyle = {
    padding: "1rem 2rem",
    borderRadius: 100,
    border: "1px solid rgba(0,0,0,0.15)",
    background: "rgba(255,255,255,0.5)",
    color: "var(--theme-text-1)",
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    transition: "all 0.3s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  const statsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "3rem",
    flexWrap: "wrap" as const,
    paddingTop: "3rem",
    borderTop: "1px solid rgba(0,0,0,0.07)",
  };

  const statValueStyle = {
    fontSize: "2.5rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const statLabelStyle = {
    fontSize: "0.9rem",
    color: "var(--theme-text-3)",
    marginTop: 4,
  };

  const scrollIndicatorStyle = {
    position: "absolute" as const,
    bottom: 32,
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0.4,
  };

  const bottomFadeStyle = {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: "linear-gradient(to top, var(--theme-bg-1), transparent)",
    pointerEvents: "none" as const,
  };

  return (
    <section style={sectionStyle}>
      {/* Stadium background */}
      <div style={backgroundStyle} />

      {/* CSS fallback / overlay */}
      <div style={overlayStyle} />

      {/* Grid */}
      <div style={gridStyle} />

      <Particles />

      {/* Content */}
      <div style={contentStyle}>
        {/* byLiGG logo wordmark */}
        <h1 style={logoStyle} className="hero-logo">
          <LogoWordmark fontSize={96} variant="gradient" />
        </h1>

        <p style={taglineStyle}>
          {t.hero.tagline}
        </p>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Headline */}
        <h2 className="hero-headline" style={headlineStyle}>
          <span style={{ display: "block" }}>
            {t.hero.line1}
            <span style={{ color: "var(--theme-accent)", margin: "0 0.5em", fontWeight: 300 }}>|</span>
            {t.hero.line2}
          </span>
          <span style={{
            display: "block", marginTop: "0.2em",
            background: "linear-gradient(90deg, var(--theme-accent), var(--theme-accent-2))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {t.hero.line3}
          </span>
        </h2>

        <p style={subtitleStyle}>
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div style={ctaContainerStyle}>
          <button
            onClick={onOpenRegister}
            style={primaryButtonStyle}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(var(--theme-accent-rgb),0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(var(--theme-accent-rgb),0.4)";
            }}
          >
            🚀 {t.hero.cta}
          </button>
          <a
            href="#how-it-works"
            style={secondaryButtonStyle}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.75)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.5)";
            }}
          >
            📊 {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Stats */}
        <div style={statsStyle}>
          {[
            { value: t.hero.stat1Value, label: t.hero.stat1Label },
            { value: t.hero.stat2Value, label: t.hero.stat2Label },
            { value: t.hero.stat3Value, label: t.hero.stat3Label },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={statValueStyle}>
                {s.value}
              </div>
              <div style={statLabelStyle}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={scrollIndicatorStyle}>
        <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
          <rect x="1" y="1" width="22" height="36" rx="11" stroke="var(--theme-text-1)" strokeWidth="1.5" />
          <rect x="10.5" y="7" width="3" height="8" rx="1.5" fill="var(--theme-text-1)" style={{ animation: "scrollDot 1.5s ease-in-out infinite" }} />
        </svg>
      </div>

      {/* Bottom fade */}
      <div style={bottomFadeStyle} />
    </section>
  );
}
