"use client";

import { useRef, useEffect, CSSProperties } from "react";
import { Renderer, Program, Triangle, Mesh, type OGLRenderingContext } from "ogl";

export interface HalftoneRevealProps {
  dotSize?: number;
  dotDensity?: number;
  angle?: number;
  revealRadius?: number;
  follow?: number;
  className?: string;
  style?: CSSProperties;
}

const vertex = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform vec2 uMouse;
uniform float uActivity;
uniform float uDotSize;
uniform float uDensity;
uniform float uAngle;
uniform float uRevealRadius;

in vec2 vUv;
out vec4 fragColor;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 aspect = vec2(iResolution.x / max(iResolution.y, 1.0), 1.0);
  vec2 duv = (vUv - uMouse) * aspect;
  float dist = length(duv);

  float radius = max(uRevealRadius, 1e-4);
  float band = radius * 0.4;
  float circle = 1.0 - smoothstep(radius - band, radius + band, dist);
  float focus = circle * uActivity;

  if (focus < 0.005) {
    fragColor = vec4(0.0);
    return;
  }

  vec2 st = vUv * aspect;
  float ang = radians(uAngle);
  vec2 rp = rot(ang) * st * uDensity;
  vec2 f = fract(rp) - 0.5;
  float d = length(f);

  float r = 0.38 * uDotSize;
  float w = length(fwidth(rp)) * 0.6 + 1e-4;
  float dots = smoothstep(r + w, r - w, d);

  // Soft hue-shifted inverted tone (steel-blue / cool slate tint)
  vec3 halftoneColor = vec3(0.49, 0.76, 0.88);
  float alpha = dots * focus * 0.35;

  fragColor = vec4(halftoneColor, alpha);
}
`;

export default function HalftoneReveal({
  dotSize = 1.0,
  dotDensity = 55,
  angle = 45,
  revealRadius = 0.28,
  follow = 0.25,
  className = "",
  style,
}: HalftoneRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<number>(follow);
  const mouseRef = useRef({
    x: 0.5,
    y: 0.5,
    sx: 0.5,
    sy: 0.5,
    active: 0,
    target: 0,
  });

  useEffect(() => {
    followRef.current = follow;
  }, [follow]);

  // WebGL halftone cursor reveal setup with ogl
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
      antialias: true,
    });

    const gl = renderer.gl as OGLRenderingContext;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const uniforms = {
      iResolution: { value: [container.clientWidth || 1, container.clientHeight || 1] },
      uMouse: { value: [0.5, 0.5] },
      uActivity: { value: 0 },
      uDotSize: { value: dotSize },
      uDensity: { value: dotDensity },
      uAngle: { value: angle },
      uRevealRadius: { value: revealRadius },
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      if (!container) return;
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w, h];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: PointerEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.target = reduced ? 0 : 1;
    };

    const onLeave = () => {
      mouseRef.current.target = 0;
    };

    // Listen on parent or window to track smoothly across the hero
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });

    let rafId: number | null = null;
    let prev = performance.now();

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
      prev = now;

      const m = mouseRef.current;
      const a = 1 - Math.exp(-dt / Math.max(0.001, followRef.current));
      m.sx += (m.x - m.sx) * a;
      m.sy += (m.y - m.sy) * a;
      const ba = 1 - Math.exp(-dt / 0.18);
      m.active += (m.target - m.active) * ba;

      uniforms.uMouse.value[0] = m.sx;
      uniforms.uMouse.value[1] = m.sy;
      uniforms.uActivity.value = m.active;

      renderer.render({ scene: mesh });
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [dotSize, dotDensity, angle, revealRadius]);

  return (
    <div
      ref={containerRef}
      className={`halftone-reveal ${className}`.trim()}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
