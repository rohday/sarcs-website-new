"use client";

import { useEffect, useRef, CSSProperties } from "react";

export interface NoiseOverlayProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
  className?: string;
  style?: CSSProperties;
}

export default function NoiseOverlay({
  patternSize = 256,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 18,
  className = "",
  style,
}: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Offscreen canvas for generating noise pattern tile
    const offscreen = document.createElement("canvas");
    offscreen.width = patternSize;
    offscreen.height = patternSize;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    const imgData = offCtx.createImageData(patternSize, patternSize);
    const buf = new Uint32Array(imgData.data.buffer);
    const len = buf.length;

    const updatePattern = () => {
      for (let i = 0; i < len; i++) {
        // Fast random noise generation
        const val = Math.floor(Math.random() * 256);
        buf[i] = (patternAlpha << 24) | (val << 16) | (val << 8) | val;
      }
      offCtx.putImageData(imgData, 0, 0);
    };

    let animationFrameId: number | null = null;
    let frameCount = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const render = () => {
      frameCount++;
      if (frameCount % patternRefreshInterval === 0) {
        updatePattern();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const pattern = ctx.createPattern(offscreen, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    updatePattern();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const initialPattern = ctx.createPattern(offscreen, "repeat");
    if (initialPattern) {
      ctx.fillStyle = initialPattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (!isReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-noise-canvas ${className}`.trim()}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "overlay",
        zIndex: 1,
        ...style,
      }}
      aria-hidden
    />
  );
}
