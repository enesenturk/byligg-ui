"use client";

import { useI18n } from "@/providers/i18n-provider";
import { LogoWordmark } from "@/components/brand/logo-wordmark";

export function Footer() {
  const { t } = useI18n();

  const SOCIAL_PATHS = {
    twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    discord: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  };

  return (
    <footer style={{ padding: "4rem 2rem 2rem", borderTop: "1px solid var(--theme-border-subtle)", background: "var(--theme-bg-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem", marginBottom: "3rem" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <LogoWordmark fontSize={22} variant="gradient" />
            </div>
            <p style={{ color: "var(--theme-text-3)", fontSize: "0.9rem", maxWidth: 280, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t.footer.tagline}
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {(Object.entries(SOCIAL_PATHS) as [string, string][]).map(([name, path]) => (
                <a key={name} href="#" aria-label={name}
                  style={{
                    width: 38, height: 38,
                    background: "var(--theme-bg-card)", border: "1px solid var(--theme-border-subtle)",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--theme-text-3)", textDecoration: "none", transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-border-subtle)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-text-3)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--theme-text-3)", marginBottom: "1rem" }}>
              {t.footer.product}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[t.footer.features, t.footer.howItWorks, t.footer.leaderboard].map(label => (
                <li key={label} style={{ marginBottom: "0.75rem" }}>
                  <a href="#" style={{ color: "var(--theme-text-3)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-text-3)"; }}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--theme-text-3)", marginBottom: "1rem" }}>
              {t.footer.legal}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[t.footer.privacy, t.footer.terms, t.footer.contact].map(label => (
                <li key={label} style={{ marginBottom: "0.75rem" }}>
                  <a href="#" style={{ color: "var(--theme-text-3)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-text-3)"; }}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--theme-text-3)", marginBottom: "1rem" }}>
              {t.footer.comingSoon}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[t.footer.iosApp, t.footer.androidApp, t.footer.apiAccess].map(label => (
                <li key={label} style={{ marginBottom: "0.75rem" }}>
                  <span style={{ color: "var(--theme-text-3)", fontSize: "0.9rem" }}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          maxWidth: "100%", paddingTop: "2rem",
          borderTop: "1px solid var(--theme-border-subtle)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          color: "var(--theme-text-3)", fontSize: "0.85rem", flexWrap: "wrap", gap: "1rem",
        }}>
          <span>{t.footer.copyright}</span>
          <span>byligg.gg</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
