"use client";

import { useI18n } from "@/providers/i18n-provider";

const TOP_PLAYERS = [
  { name: "GalatasarayFan23", pts: 2840, accuracy: "74%", badges: ["🔥", "⚡"], flag: "🇹🇷" },
  { name: "BursasporKral",    pts: 2710, accuracy: "71%", badges: ["🎯"],       flag: "🇹🇷" },
  { name: "FenerBaşar",      pts: 2650, accuracy: "69%", badges: ["🔥"],       flag: "🇹🇷" },
  { name: "BeşiktaşKartal",  pts: 2490, accuracy: "67%", badges: [],           flag: "🇹🇷" },
  { name: "TrakyaPredict",   pts: 2380, accuracy: "64%", badges: [],           flag: "🇹🇷" },
];

const rankBadge = (i: number) => {
  if (i === 0) return { bg: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#000" };
  if (i === 1) return { bg: "linear-gradient(135deg, #9ca3af, #6b7280)", color: "#000" };
  if (i === 2) return { bg: "linear-gradient(135deg, #d97706, #b45309)", color: "#000" };
  return { bg: "rgba(255,255,255,0.06)", color: "rgba(180,200,255,0.6)" };
};

export function LeaderboardPreview() {
  const { t } = useI18n();

  return (
    <section id="leaderboard" style={{ minHeight: "100svh", padding: "clamp(2rem, 4vh, 5rem) 2rem", background: "var(--theme-bg-2)", scrollMarginTop: "80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(1.25rem, 2.5vh, 2.5rem)" } as React.CSSProperties}>
          <div style={{
            display: "inline-block", padding: "0.4rem 1rem",
            background: "rgba(var(--theme-accent-rgb),0.08)", border: "1px solid rgba(var(--theme-accent-rgb),0.2)",
            borderRadius: 100, fontSize: "0.75rem", fontWeight: 600,
            color: "var(--theme-accent)", textTransform: "uppercase" as const, letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}>
            {t.leaderboard.badge}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>
            {t.leaderboard.title}
          </h2>
          <p style={{ color: "rgba(180,200,255,0.6)", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
            {t.leaderboard.subtitle}
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="leaderboard-grid">
          {/* Main leaderboard */}
          <div style={{ background: "var(--theme-bg-card)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#fff", margin: 0 }}>{t.leaderboard.thisWeek}</h3>
              <span style={{ padding: "0.35rem 0.75rem", background: "rgba(var(--theme-accent-rgb),0.08)", borderRadius: 100, fontSize: "0.75rem", color: "var(--theme-accent)", fontWeight: 600 }}>
                {t.leaderboard.live}
              </span>
            </div>
            <div style={{ padding: "0.5rem" }}>
              {TOP_PLAYERS.map((p, i) => {
                const badge = rankBadge(i);
                return (
                  <div key={p.name}
                    style={{ display: "flex", alignItems: "center", padding: "1rem", borderRadius: 12, transition: "background 0.3s", cursor: "default" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--theme-bg-hover)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                  >
                    {/* Rank */}
                    <div style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.9rem", borderRadius: 8,
                      background: badge.bg, color: badge.color, marginRight: "1rem", flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    {/* User */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "0.9rem", color: "var(--theme-bg-1)",
                      }}>
                        {p.name[0].toUpperCase()}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                        <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                          {p.badges.map((b, bi) => <span key={bi} style={{ fontSize: "0.7rem" }}>{b}</span>)}
                          <span style={{ fontSize: "0.7rem" }}>{p.flag}</span>
                        </div>
                      </div>
                    </div>
                    {/* Points */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--theme-accent)" }}>
                        {p.pts.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(180,200,255,0.4)" }}>{p.accuracy}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats widget */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Personal stats card */}
            <div style={{ background: "var(--theme-bg-card)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.5rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: "1.5rem" }}>{t.leaderboard.rankingSystem}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: t.leaderboard.tierExact, pts: "10p", color: "#00ff88" },
                  { label: t.leaderboard.tierWinnerDiff, pts: "7p", color: "#00D4FF" },
                  { label: t.leaderboard.tierWinner, pts: "4p", color: "#7B2FFF" },
                  { label: t.leaderboard.tierDraw, pts: "3p", color: "#fbbf24" },
                  { label: t.leaderboard.tierClose, pts: "2p", color: "#f97316" },
                  { label: t.leaderboard.tierWrong, pts: "0p", color: "rgba(255,255,255,0.2)" },
                ].map((tier) => (
                  <div key={tier.label} style={{
                    background: "var(--theme-bg-1)", borderRadius: 10, padding: "0.75rem 1rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: tier.color }}>{tier.pts}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(180,200,255,0.5)", marginTop: 2 }}>{tier.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multiplier card */}
            <div style={{
              background: "linear-gradient(135deg, rgba(var(--theme-accent-rgb),0.08), rgba(var(--theme-accent-2-rgb),0.08))",
              border: "1px solid rgba(var(--theme-accent-rgb),0.15)",
              borderRadius: 20, padding: "1.5rem",
            }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: "0.75rem" }}>{t.leaderboard.multiplierTitle}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(180,200,255,0.6)", fontSize: "0.9rem" }}>{t.leaderboard.derby}</span>
                  <span style={{ fontWeight: 700, color: "#fbbf24" }}>x2</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(180,200,255,0.6)", fontSize: "0.9rem" }}>{t.leaderboard.campaign}</span>
                  <span style={{ fontWeight: 700, color: "#00ff88" }}>x3</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(180,200,255,0.6)", fontSize: "0.9rem" }}>{t.leaderboard.deadline}</span>
                  <span style={{ fontWeight: 700, color: "#00D4FF" }}>-15 dk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="/leaderboard" style={{
            padding: "0.75rem 1.75rem", borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(180,200,255,0.7)", textDecoration: "none",
            fontSize: "0.9rem", fontWeight: 600, display: "inline-block", transition: "all 0.3s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,200,255,0.7)"; }}
          >
            {t.leaderboard.viewAll} →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .leaderboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
