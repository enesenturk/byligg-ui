"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/providers/i18n-provider";

type DayKey = "today" | "tomorrow" | "sunday" | "tuesday" | "wednesday";
type LeagueKey = "pl" | "laliga" | "tsl" | "ucl";

const MATCHES: {
  league: LeagueKey;
  home: { name: string; emoji: string; form: string[] };
  away: { name: string; emoji: string; form: string[] };
  day: DayKey;
  clock: string;
  round?: string;
  isDerby?: boolean;
  isQF?: boolean;
}[] = [
  {
    league: "pl",
    home: { name: "Manchester City", emoji: "🦁", form: ["W","W","D","W","L"] },
    away: { name: "Arsenal", emoji: "🔴", form: ["W","D","W","W","W"] },
    day: "today", clock: "21:00", round: "30",
  },
  {
    league: "laliga",
    home: { name: "Real Madrid", emoji: "👑", form: ["W","W","W","D","W"] },
    away: { name: "Barcelona", emoji: "🔵", form: ["W","L","W","W","D"] },
    day: "tomorrow", clock: "22:00", round: "29",
  },
  {
    league: "tsl",
    home: { name: "Galatasaray", emoji: "🦁", form: ["W","W","W","W","D"] },
    away: { name: "Fenerbahçe", emoji: "💛", form: ["W","D","W","L","W"] },
    day: "sunday", clock: "19:00", round: "28", isDerby: true,
  },
  {
    league: "ucl",
    home: { name: "Bayern München", emoji: "🔴", form: ["W","W","D","W","W"] },
    away: { name: "PSG", emoji: "🔵", form: ["W","W","W","D","W"] },
    day: "tuesday", clock: "21:00", isQF: true,
  },
  {
    league: "pl",
    home: { name: "Liverpool", emoji: "🔴", form: ["W","W","W","D","W"] },
    away: { name: "Chelsea", emoji: "🔵", form: ["D","W","L","W","W"] },
    day: "wednesday", clock: "21:45", round: "31",
  },
];

const formColor = (r: string) =>
  r === "W" ? "#00ff88" : r === "D" ? "#fbbf24" : "#ef4444";

const CARD_GAP = 10;
const MIN_CARD_H = 72;
const MAX_CARD_H = 130;
// fixed chrome outside of cards: navbar + section padding (2rem*2) + header→cards gap + cards→viewall gap + viewall button
const NAVBAR = 80;
const SECTION_PAD = 64; // 2rem top + 2rem bottom
const GAP_HEADER = 20;  // margin between header and cards
const GAP_VIEWALL = 16; // margin between cards and view-all

export function Matches() {
  const { t } = useI18n();

  const LEAGUES = [
    { id: "all",    label: t.matches.all },
    { id: "pl",     label: t.matches.leaguePL },
    { id: "laliga", label: t.matches.leagueLaLiga },
    { id: "tsl",    label: t.matches.leagueTSL },
    { id: "ucl",    label: t.matches.leagueUCL },
  ];

  const leagueLabel: Record<LeagueKey, string> = {
    pl:     t.matches.leaguePL,
    laliga: t.matches.leagueLaLiga,
    tsl:    t.matches.leagueTSL,
    ucl:    t.matches.leagueUCL,
  };

  const matchTime = (day: DayKey, clock: string) =>
    `${t.matches[day]} ${clock}`;

  const matchLabel = (m: typeof MATCHES[0]) => {
    const league = leagueLabel[m.league];
    if (m.isQF) return `${league} • ${t.matches.quarterFinal}`;
    const round = m.round ? `${t.matches.week} ${m.round}` : "";
    const derby = m.isDerby ? ` — ${t.matches.derby} ⚡` : "";
    return `${league} • ${round}${derby}`;
  };

  const [activeLeague, setActiveLeague] = useState("all");
  const [predictions, setPredictions] = useState<Record<number, string>>({});
  const [cardHeight, setCardHeight] = useState(88);
  const [visibleCount, setVisibleCount] = useState(3);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () => {
      const headerH = headerRef.current?.offsetHeight ?? 80;
      const viewAllH = viewAllRef.current?.offsetHeight ?? 48;
      const available = window.innerHeight - NAVBAR - SECTION_PAD - headerH - GAP_HEADER - GAP_VIEWALL - viewAllH;
      const count = Math.max(1, Math.min(5, Math.floor(available / (MIN_CARD_H + CARD_GAP))));
      const h = Math.min(MAX_CARD_H, Math.max(MIN_CARD_H,
        Math.floor((available - (count - 1) * CARD_GAP) / count)
      ));
      setVisibleCount(count);
      setCardHeight(h);
    };
    const timer = setTimeout(calc, 50);
    window.addEventListener("resize", calc);
    return () => { clearTimeout(timer); window.removeEventListener("resize", calc); };
  }, []);

  const filtered = (activeLeague === "all" ? MATCHES : MATCHES.filter(m => m.league === activeLeague))
    .slice(0, visibleCount);

  const pick = (matchIdx: number, outcome: string) =>
    setPredictions(p => ({ ...p, [matchIdx]: p[matchIdx] === outcome ? "" : outcome }));

  return (
    <section
      id="matches"
      style={{
        minHeight: "100svh",
        padding: "2rem",
        background: "var(--theme-bg-1)",
        scrollMarginTop: "80px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div ref={headerRef} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{
              display: "inline-block", padding: "0.3rem 0.9rem",
              background: "rgba(var(--theme-accent-rgb),0.08)", border: "1px solid rgba(var(--theme-accent-rgb),0.2)",
              borderRadius: 100, fontSize: "0.7rem", fontWeight: 600,
              color: "var(--theme-accent)", textTransform: "uppercase" as const, letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}>
              {t.matches.badge}
            </div>
            <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "var(--theme-text-1)", margin: 0 }}>
              {t.matches.title}
            </h2>
          </div>

          {/* League tabs */}
          <div style={{
            display: "flex", gap: "0.35rem",
            background: "var(--theme-bg-card)", padding: "0.2rem",
            borderRadius: 10, border: "1px solid var(--theme-border-subtle)",
            flexWrap: "wrap",
          }}>
            {LEAGUES.map(lg => (
              <button key={lg.id} onClick={() => setActiveLeague(lg.id)}
                style={{
                  padding: "0.4rem 0.9rem", border: "none", borderRadius: 7,
                  background: activeLeague === lg.id ? "var(--theme-accent)" : "transparent",
                  color: activeLeague === lg.id ? "var(--theme-bg-1)" : "var(--theme-text-2)",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >{lg.label}</button>
            ))}
          </div>
        </div>

        {/* Match cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: CARD_GAP, marginTop: GAP_HEADER, flex: 1 }}>
          {filtered.map((match, idx) => {
            const realIdx = MATCHES.indexOf(match);
            const pred = predictions[realIdx];
            return (
              <div key={idx}
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border-subtle)",
                  borderRadius: 14, padding: "0 1.25rem",
                  display: "flex", alignItems: "center",
                  height: cardHeight, boxSizing: "border-box",
                  transition: "all 0.25s", overflow: "hidden",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(var(--theme-accent-rgb),0.2)"; (e.currentTarget as HTMLDivElement).style.background = "var(--theme-bg-hover)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--theme-border-subtle)"; (e.currentTarget as HTMLDivElement).style.background = "var(--theme-bg-card)"; }}
              >
                {/* Home team — left */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
                  <div style={{ width: 38, height: 38, background: "var(--theme-bg-1)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                    {match.home.emoji}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--theme-text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.home.name}</div>
                    <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                      {match.home.form.map((r, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: formColor(r), display: "block", flexShrink: 0 }} />)}
                    </div>
                  </div>
                </div>

                {/* Center */}
                <div style={{ flexShrink: 0, width: 180, textAlign: "center", padding: "0 0.5rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--theme-text-3)", marginBottom: 1 }}>{matchTime(match.day, match.clock)}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--theme-text-1)", lineHeight: 1 }}>VS</div>
                  <div style={{ fontSize: "0.6rem", color: "var(--theme-text-3)", margin: "2px 0 6px" }}>{matchLabel(match)}</div>
                  <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center" }}>
                    {["1", "X", "2"].map(o => (
                      <button key={o} onClick={() => pick(realIdx, o)}
                        style={{
                          width: 36, padding: "0.25rem 0",
                          background: pred === o ? "var(--theme-accent)" : "var(--theme-bg-1)",
                          border: `1px solid ${pred === o ? "var(--theme-accent)" : "var(--theme-border)"}`,
                          borderRadius: 6,
                          color: pred === o ? "var(--theme-bg-1)" : "var(--theme-text-2)",
                          fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
                          transition: "all 0.2s", fontFamily: "var(--font-inter), sans-serif",
                        }}
                        onMouseEnter={e => { if (pred !== o) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--theme-accent)"; }}
                        onMouseLeave={e => { if (pred !== o) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--theme-border)"; }}
                      >{o}</button>
                    ))}
                  </div>
                </div>

                {/* Away team — right */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.65rem", minWidth: 0 }}>
                  <div style={{ minWidth: 0, textAlign: "right" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--theme-text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.away.name}</div>
                    <div style={{ display: "flex", gap: 3, marginTop: 4, justifyContent: "flex-end" }}>
                      {match.away.form.map((r, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: formColor(r), display: "block", flexShrink: 0 }} />)}
                    </div>
                  </div>
                  <div style={{ width: 38, height: 38, background: "var(--theme-bg-1)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                    {match.away.emoji}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div ref={viewAllRef} style={{ textAlign: "center", marginTop: GAP_VIEWALL }}>
          <a href="/matches" style={{
            padding: "0.6rem 1.5rem", borderRadius: 8,
            border: "1px solid var(--theme-border)",
            color: "var(--theme-text-2)", textDecoration: "none",
            fontSize: "0.85rem", fontWeight: 600, transition: "all 0.3s",
            display: "inline-block",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--theme-border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--theme-text-2)"; }}
          >
            {t.matches.viewAll} →
          </a>
        </div>
      </div>
    </section>
  );
}
