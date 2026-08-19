"use client";

import { useEffect, useRef } from "react";

export interface AsciiWavesProps {
  characters?: string;
  fontSize?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  color?: string;
  secondaryColor?: string;
  className?: string;
}

export default function AsciiWaves({
  characters = " .·:*+=%#@",
  fontSize = 13,
  waveSpeed = 0.8,
  waveFrequency = 0.035,
  waveAmplitude = 22,
  color = "#7ec1e0",
  secondaryColor = "#94a3b8",
  className = "",
}: AsciiWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight || 450;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const parent = canvas.parentElement;
      const width = parent?.clientWidth || 400;
      const height = parent?.clientHeight || 450;

      ctx.clearRect(0, 0, width, height);

      const speed = isReducedMotion ? 0 : waveSpeed * 0.02;
      time += speed;

      const charWidth = fontSize * 0.72;
      const charHeight = fontSize * 1.35;
      const cols = Math.floor(width / charWidth);
      const rows = Math.floor(height / charHeight);

      ctx.font = `${fontSize}px var(--font-jbmono), monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const charArray = characters.split("");
      const numChars = charArray.length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charWidth + charWidth / 2;
          const baseY = r * charHeight + charHeight / 2;

          // Multi-harmonic wave function
          const wave1 = Math.sin(c * waveFrequency + time) * waveAmplitude;
          const wave2 =
            Math.cos(r * waveFrequency * 1.4 - time * 0.8) *
            (waveAmplitude * 0.6);
          const wave3 =
            Math.sin((c + r) * waveFrequency * 0.7 + time * 1.2) *
            (waveAmplitude * 0.4);

          const yOffset = wave1 + wave2 + wave3;
          const norm = (yOffset + waveAmplitude * 2) / (waveAmplitude * 4);
          const clampedNorm = Math.min(Math.max(norm, 0), 1);

          const charIndex = Math.floor(clampedNorm * (numChars - 1));
          const char = charArray[charIndex] || " ";

          if (char === " ") continue;

          // Fade out edges smoothly
          const edgeFadeX = Math.sin((c / cols) * Math.PI);
          const edgeFadeY = Math.sin((r / rows) * Math.PI);
          const edgeAlpha = Math.max(0, edgeFadeX * edgeFadeY);

          const alpha = (0.2 + clampedNorm * 0.7) * edgeAlpha;

          ctx.fillStyle =
            clampedNorm > 0.55
              ? color
              : secondaryColor;
          ctx.globalAlpha = alpha;

          ctx.fillText(char, x, baseY + yOffset * 0.35);
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      io.disconnect();
    };
  }, [characters, fontSize, waveSpeed, waveFrequency, waveAmplitude, color, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`ascii-waves ${className}`.trim()}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}
