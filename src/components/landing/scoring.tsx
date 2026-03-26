"use client";

import { useI18n } from "@/providers/i18n-provider";

interface ScoreTier {
  pts: number;
  label: string;
  desc: string;
  /** Tailwind text/bg color classes that don't depend on theme */
  color: string;
  bg: string;
  example: string;
}

export function Scoring() {
  const { t } = useI18n();

  const tiers: ScoreTier[] = [
    {
      pts: 10,
      label: t.scoring.exact,
      desc: t.scoring.exactDesc,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/20",
      example: "2–1 ✓ 2–1",
    },
    {
      pts: 7,
      label: t.scoring.winnerDiff,
      desc: t.scoring.winnerDiffDesc,
      color: "text-sky-400",
      bg: "bg-sky-400/10 border-sky-400/20",
      example: "3–1 ✓ 2–0",
    },
    {
      pts: 4,
      label: t.scoring.winner,
      desc: t.scoring.winnerDesc,
      color: "text-violet-400",
      bg: "bg-violet-400/10 border-violet-400/20",
      example: "3–2 ✓ 1–0",
    },
    {
      pts: 3,
      label: t.scoring.draw,
      desc: t.scoring.drawDesc,
      color: "text-amber-400",
      bg: "bg-amber-400/10 border-amber-400/20",
      example: "1–1 ✓ 0–0",
    },
    {
      pts: 2,
      label: t.scoring.close,
      desc: t.scoring.closeDesc,
      color: "text-orange-400",
      bg: "bg-orange-400/10 border-orange-400/20",
      example: "2–1 ✓ 2–2",
    },
    {
      pts: 0,
      label: t.scoring.wrong,
      desc: t.scoring.wrongDesc,
      color: "text-zinc-600",
      bg: "bg-[#0A1930]/50 border-zinc-700/30",
      example: "3–0 ✗ 0–2",
    },
  ];

  return (
    <section className="bg-[#020B1A] py-24 px-5">
      {/* Top divider */}
      <div
        className="mx-auto max-w-7xl h-px mb-24 opacity-20"
        style={{
          background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            {t.scoring.title}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.scoring.subtitle}
          </p>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.pts + tier.label}
              className={`rounded-2xl border p-5 flex flex-col gap-3 ${tier.bg}`}
            >
              {/* Points badge */}
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-black tabular-nums ${tier.color}`}>
                  {tier.pts}
                  <span className="text-base font-semibold ml-0.5">p</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-600 bg-[#051228]/60 px-2 py-0.5 rounded-md">
                  {tier.example}
                </span>
              </div>

              {/* Labels */}
              <div>
                <p className={`text-sm font-semibold ${tier.color}`}>{tier.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{tier.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Derbi multiplier note */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          {t.scoring.multiplierNote}
        </p>
      </div>
    </section>
  );
}
