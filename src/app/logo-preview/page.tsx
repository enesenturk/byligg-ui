"use client";

import { LogoWordmark } from "@/components/brand/logo-wordmark";

export default function LogoPreviewPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0d0f18", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4rem", padding: "4rem 2rem" }}>

      {/* Dark bg — gradient variant */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <p style={{ color: "rgba(180,200,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Navbar boyutu</p>
        <LogoWordmark fontSize={28} variant="gradient" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <p style={{ color: "rgba(180,200,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Hero boyutu</p>
        <LogoWordmark fontSize={80} variant="gradient" />
      </div>

      {/* White variant */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem 3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <p style={{ color: "rgba(180,200,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Beyaz varyant</p>
        <LogoWordmark fontSize={40} variant="white" />
      </div>

    </div>
  );
}
