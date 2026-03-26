"use client";

import Image from "next/image";
import React from "react";

interface LogoWordmarkProps {
  fontSize?: number;
  variant?: "gradient" | "white" | "blue-outline" | "blue-fill";
}

export function LogoWordmark({ fontSize = 24, variant = "gradient" }: LogoWordmarkProps) {
  const strokeWidth = Math.max(1.5, fontSize * 0.028);

  const baseText: React.CSSProperties = {
    fontSize,
    fontWeight: 900,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    display: "inline",
    fontFamily: "var(--font-inter), sans-serif",
  };

  const textStyle: React.CSSProperties =
    variant === "gradient"
      ? {
          ...baseText,
          lineHeight: 1.2,
          background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }
      : variant === "white"
      ? {
          ...baseText,
          color: "transparent",
          WebkitTextStroke: `${strokeWidth}px white`,
        }
      : variant === "blue-outline"
      ? {
          ...baseText,
          color: "transparent",
          WebkitTextStroke: `${strokeWidth}px var(--theme-accent)`,
        }
      : {
          ...baseText,
          background: "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          WebkitTextStroke: `${strokeWidth * 2}px white`,
          paintOrder: "stroke fill",
        };

  const ballWidth = Math.round(fontSize * 1.8);
  const ballHeight = Math.round(ballWidth * 374 / 668);
  const ballBottom = Math.round(fontSize * 0.75);

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", userSelect: "none", overflow: "visible", paddingBottom: "0.3em" }}>
      <span style={textStyle}>by</span>
      <span style={textStyle}>L</span>

      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={textStyle}>ı</span>
        <span
          style={{
            position: "absolute",
            bottom: ballBottom,
            left: "55%",
            transform: "translateX(-50%)",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/ball-icon.png"
            width={ballWidth}
            height={ballHeight}
            alt="Ball icon"
            style={{ display: "block", maxWidth: "none" }}
            priority
          />
        </span>
      </span>

      <span style={{ ...textStyle, marginLeft: Math.round(fontSize * 0.06) }}>GG</span>
    </span>
  );
}
