"use client";

import { CSSProperties } from "react";

export interface NoiseOverlayProps {
  opacity?: number;
  fps?: number;
  className?: string;
  style?: CSSProperties;
}

export default function NoiseOverlay({
  opacity = 0.075,
  className = "",
  style,
}: NoiseOverlayProps) {
  // SVG feTurbulence noise data URI
  const noiseSvg =
    "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <div
      aria-hidden
      className={`hero-noise-overlay ${className}`.trim()}
      style={{
        position: "absolute",
        inset: "-20%",
        width: "140%",
        height: "140%",
        backgroundImage: `url("${noiseSvg}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
        opacity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        animation: "hero-noise-shift 0.8s steps(4) infinite",
        zIndex: 1,
        ...style,
      }}
    />
  );
}
