"use client";

import { useRef, useEffect, CSSProperties } from "react";
import { Renderer, Program, Triangle, Mesh, type OGLRenderingContext } from "ogl";

export type PolyhedronShape =
  | "tetrahedron"
  | "cube"
  | "octahedron"
  | "dodecahedron"
  | "icosahedron";

export interface WireframeBallProps {
  shape?: PolyhedronShape;
  detail?: number;
  stretch?: number;
  zoom?: number;
  speed?: number;
  wobble?: number;
  showEdges?: boolean;
  edgeColor?: string;
  edgeGlow?: number;
  edgeThickness?: number;
  showVertices?: boolean;
  vertexColor?: string;
  vertexSize?: number;
  vertexGlow?: number;
  depthColor?: string;
  depthTint?: number;
  depthFade?: number;
  brightness?: number;
  opacity?: number;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [0.02, 0.03, 0.04];
};

const vertexShader = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float uTime;
uniform float uZoom;
uniform float uStretch;
uniform float uWobble;
uniform float uSpeed;

uniform bool uShowEdges;
uniform vec3 uEdgeColor;
uniform float uEdgeGlow;
uniform float uEdgeThickness;

uniform bool uShowVertices;
uniform vec3 uVertexColor;
uniform float uVertexSize;
uniform float uVertexGlow;

uniform vec3 uDepthColor;
uniform float uDepthTint;
uniform float uDepthFade;

uniform float uBrightness;
uniform float uOpacity;

in vec2 vUv;
out vec4 fragColor;

// 12 vertices of regular icosahedron normalized to unit sphere
const float PHI = 1.618033988749895;
const float S = 0.5257311121191336; // 1 / sqrt(1 + PHI^2)
const float C = 0.85065080835204;   // PHI / sqrt(1 + PHI^2)

vec3 getVertex(int i) {
  if (i == 0) return vec3(0.0, S, C);
  if (i == 1) return vec3(0.0, -S, C);
  if (i == 2) return vec3(0.0, S, -C);
  if (i == 3) return vec3(0.0, -S, -C);
  if (i == 4) return vec3(S, C, 0.0);
  if (i == 5) return vec3(-S, C, 0.0);
  if (i == 6) return vec3(S, -C, 0.0);
  if (i == 7) return vec3(-S, -C, 0.0);
  if (i == 8) return vec3(C, 0.0, S);
  if (i == 9) return vec3(-C, 0.0, S);
  if (i == 10) return vec3(C, 0.0, -S);
  return vec3(-C, 0.0, -S);
}

ivec2 getEdge(int i) {
  if (i == 0) return ivec2(0, 1);
  if (i == 1) return ivec2(0, 4);
  if (i == 2) return ivec2(0, 5);
  if (i == 3) return ivec2(0, 8);
  if (i == 4) return ivec2(0, 9);
  if (i == 5) return ivec2(1, 6);
  if (i == 6) return ivec2(1, 7);
  if (i == 7) return ivec2(1, 8);
  if (i == 8) return ivec2(1, 9);
  if (i == 9) return ivec2(2, 3);
  if (i == 10) return ivec2(2, 4);
  if (i == 11) return ivec2(2, 5);
  if (i == 12) return ivec2(2, 10);
  if (i == 13) return ivec2(2, 11);
  if (i == 14) return ivec2(3, 6);
  if (i == 15) return ivec2(3, 7);
  if (i == 16) return ivec2(3, 10);
  if (i == 17) return ivec2(3, 11);
  if (i == 18) return ivec2(4, 5);
  if (i == 19) return ivec2(4, 8);
  if (i == 20) return ivec2(4, 10);
  if (i == 21) return ivec2(5, 9);
  if (i == 22) return ivec2(5, 11);
  if (i == 23) return ivec2(6, 7);
  if (i == 24) return ivec2(6, 8);
  if (i == 25) return ivec2(6, 10);
  if (i == 26) return ivec2(7, 9);
  if (i == 27) return ivec2(7, 11);
  if (i == 28) return ivec2(8, 10);
  return ivec2(9, 11);
}

float distToSegment(vec3 p, vec3 a, vec3 b) {
  vec3 pa = p - a;
  vec3 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

mat3 rotY(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
}

mat3 rotX(float a) {
  float c = cos(a), s = sin(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
}

mat3 rotZ(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
}

void main() {
  vec2 uv = (vUv - 0.5) * vec2(iResolution.x / iResolution.y, 1.0);

  float t = uTime * uSpeed;
  mat3 rot = rotY(t * 0.45) * rotX(t * 0.32 + sin(t * 0.2) * uWobble) * rotZ(t * 0.18);
  mat3 invRot = transpose(rot);

  vec3 ro = vec3(0.0, 0.0, 2.6 / max(uZoom, 0.1));
  vec3 rd = normalize(vec3(uv, -1.8));

  // Ray - sphere intersection (radius ~ 1.0)
  float b = dot(ro, rd);
  float c = dot(ro, ro) - 1.0 * uStretch;
  float d = b * b - c;

  if (d < 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  float sqrtd = sqrt(d);
  float tFront = -b - sqrtd;
  float tBack = -b + sqrtd;

  vec3 pFront = rot * (ro + rd * tFront);
  vec3 pBack = rot * (ro + rd * tBack);

  // Evaluate edge distance and vertex distance
  float minEdgeFront = 10.0;
  float minVertFront = 10.0;
  float minEdgeBack = 10.0;
  float minVertBack = 10.0;

  if (uShowVertices) {
    for (int i = 0; i < 12; i++) {
      vec3 v = getVertex(i);
      minVertFront = min(minVertFront, length(pFront - v));
      minVertBack = min(minVertBack, length(pBack - v));
    }
  }

  if (uShowEdges) {
    for (int i = 0; i < 30; i++) {
      ivec2 e = getEdge(i);
      vec3 v0 = getVertex(e.x);
      vec3 v1 = getVertex(e.y);
      minEdgeFront = min(minEdgeFront, distToSegment(pFront, v0, v1));
      minEdgeBack = min(minEdgeBack, distToSegment(pBack, v0, v1));
    }
  }

  float ethick = max(uEdgeThickness * 0.02, 0.005);
  float eglow = uEdgeGlow * 0.05;
  float vthick = max(uVertexSize * 0.03, 0.008);
  float vglow = uVertexGlow * 0.06;

  float edgeValFront = uShowEdges ? (1.0 - smoothstep(ethick, ethick + eglow, minEdgeFront)) : 0.0;
  float vertValFront = uShowVertices ? (1.0 - smoothstep(vthick, vthick + vglow, minVertFront)) : 0.0;

  float edgeValBack = uShowEdges ? (1.0 - smoothstep(ethick, ethick + eglow, minEdgeBack)) : 0.0;
  float vertValBack = uShowVertices ? (1.0 - smoothstep(vthick, vthick + vglow, minVertBack)) : 0.0;

  float backFade = clamp(1.0 - uDepthFade * 0.65, 0.0, 1.0);
  edgeValBack *= backFade;
  vertValBack *= backFade;

  // Composite front and back hits
  vec3 frontCol = mix(uEdgeColor * edgeValFront, uVertexColor, vertValFront);
  vec3 backCol = mix(mix(uEdgeColor, uDepthColor, uDepthTint) * edgeValBack, uVertexColor * (1.0 - uDepthFade * 0.5), vertValBack);

  float totalAlphaFront = clamp(edgeValFront + vertValFront, 0.0, 1.0);
  float totalAlphaBack = clamp(edgeValBack + vertValBack, 0.0, 1.0) * backFade;

  float totalAlpha = clamp(totalAlphaFront + totalAlphaBack * 0.6, 0.0, 1.0) * uOpacity * uBrightness;
  vec3 finalColor = frontCol + backCol * 0.7;

  fragColor = vec4(finalColor, totalAlpha);
}
`;

export default function WireframeBall({
  zoom = 0.95,
  stretch = 1.0,
  speed = 0.45,
  wobble = 0.15,
  showEdges = true,
  edgeColor = "#05080a",
  edgeGlow = 0.45,
  edgeThickness = 0.85,
  showVertices = true,
  vertexColor = "#05080a",
  vertexSize = 0.75,
  vertexGlow = 0.45,
  depthColor = "#020406",
  depthTint = 0.35,
  depthFade = 0.4,
  brightness = 1.0,
  opacity = 0.95,
  paused = false,
  className = "",
  style,
}: WireframeBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: unknown }> | null>(null);

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
      iResolution: {
        value: [container.clientWidth || 300, container.clientHeight || 300],
      },
      uTime: { value: 0 },
      uZoom: { value: zoom },
      uStretch: { value: stretch },
      uWobble: { value: wobble },
      uSpeed: { value: reduced || paused ? 0 : speed },
      uShowEdges: { value: showEdges },
      uEdgeColor: { value: hexToRgb(edgeColor) },
      uEdgeGlow: { value: edgeGlow },
      uEdgeThickness: { value: edgeThickness },
      uShowVertices: { value: showVertices },
      uVertexColor: { value: hexToRgb(vertexColor) },
      uVertexSize: { value: vertexSize },
      uVertexGlow: { value: vertexGlow },
      uDepthColor: { value: hexToRgb(depthColor) },
      uDepthTint: { value: depthTint },
      uDepthFade: { value: depthFade },
      uBrightness: { value: brightness },
      uOpacity: { value: opacity },
    };
    uniformsRef.current = uniforms;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w, h];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rafId: number | null = null;
    let prev = performance.now();
    let currentT = 0;

    const renderLoop = (now: number) => {
      if (!reduced && !paused) {
        rafId = requestAnimationFrame(renderLoop);
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
      prev = now;

      if (!reduced && !paused) {
        currentT += dt;
        uniforms.uTime.value = currentT;
      } else {
        uniforms.uTime.value = 0.5; // Static aesthetic posture
      }

      renderer.render({ scene: mesh });
    };

    renderLoop(performance.now());

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [
    zoom,
    stretch,
    speed,
    wobble,
    showEdges,
    edgeColor,
    edgeGlow,
    edgeThickness,
    showVertices,
    vertexColor,
    vertexSize,
    vertexGlow,
    depthColor,
    depthTint,
    depthFade,
    brightness,
    opacity,
    paused,
  ]);

  return (
    <div
      ref={containerRef}
      className={`wireframe-ball ${className}`.trim()}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden
    />
  );
}
