"use client";

import React from "react";
import PixelSwap from "@/components/effects/PixelSwap";
import LabLogo from "@/components/ui/LabLogo";
import labInfo from "@/data/lab.json";
import "./HeroReveal.css";

export default function HeroReveal() {
  const tagline = labInfo.tagline || "Computing at the Edge of What's Possible";

  // First content: dynamic monogram with subtle rotating orbits and breathing glow
  const firstContent = (
    <div className="hero-monogram-container" aria-label="SARCS interactive emblem">
      <div className="hero-monogram-glow" aria-hidden />
      <div className="hero-monogram-ring-outer" aria-hidden />
      <div className="hero-monogram-ring" aria-hidden />
      <div className="hero-monogram-text">SARCS</div>
    </div>
  );

  // Second content: SARCS lab logo + official tagline
  const secondContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.875rem",
        padding: "1.25rem",
        textAlign: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <LabLogo />
      <p
        className="type-mono"
        style={{
          fontSize: "0.6875rem",
          color: "var(--text-secondary)",
          margin: 0,
          lineHeight: 1.45,
          letterSpacing: "0.04em",
          maxWidth: "22ch",
        }}
      >
        {tagline}
      </p>
    </div>
  );

  return (
    <div className="hero-reveal-wrapper">
      <PixelSwap
        firstContent={firstContent}
        secondContent={secondContent}
        trigger="hover"
        pattern="edges"
        pixelSize={32}
        gap={2}
        pixelRadius={8}
        duration={1200}
        pixelDuration={450}
        fade
        aspectRatio="3/4"
      />
    </div>
  );
}
