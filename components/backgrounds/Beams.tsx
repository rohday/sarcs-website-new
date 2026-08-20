"use client";

import { useEffect, useRef, CSSProperties } from "react";
import {
  Renderer,
  Program,
  Mesh,
  Camera,
  Transform,
  Geometry,
  type OGLRenderingContext,
} from "ogl";

export interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
  className?: string;
  style?: CSSProperties;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

const noiseGLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
`;

const vertexShader = `#version 300 es
in vec3 position;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpeed;
uniform float uNoiseIntensity;
uniform float uScale;

out vec2 vUv;
out vec3 vNormal;
out vec3 vWorldPos;

${noiseGLSL}

float getPos(vec3 pos, vec2 uvCoord) {
  vec3 noisePos = vec3(pos.x * 0.0, pos.y - uvCoord.y, pos.z + uTime * uSpeed * 2.5) * uScale;
  return cnoise(noisePos) * uNoiseIntensity;
}

vec3 getCurrentPos(vec3 pos, vec2 uvCoord) {
  vec3 newpos = pos;
  newpos.z += getPos(pos, uvCoord);
  return newpos;
}

vec3 getNormal(vec3 pos, vec2 uvCoord) {
  vec3 curpos = getCurrentPos(pos, uvCoord);
  vec3 nextposX = getCurrentPos(pos + vec3(0.02, 0.0, 0.0), uvCoord);
  vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.02, 0.0), uvCoord);
  vec3 tangentX = normalize(nextposX - curpos);
  vec3 tangentZ = normalize(nextposZ - curpos);
  return normalize(cross(tangentZ, tangentX));
}

void main() {
  vUv = uv;
  vec3 displacedPos = position;
  displacedPos.z += getPos(position, uv);
  vNormal = getNormal(position, uv);
  vWorldPos = displacedPos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform vec3 uLightColor;
uniform vec3 uBaseColor;
uniform float uNoiseIntensity;

in vec2 vUv;
in vec3 vNormal;
in vec3 vWorldPos;
out vec4 fragColor;

${noiseGLSL}

void main() {
  vec3 norm = normalize(vNormal);
  vec3 lightDir = normalize(vec3(0.0, 3.0, 10.0));
  vec3 viewDir = normalize(vec3(0.0, 0.0, 20.0) - vWorldPos);

  // Directional diffuse
  float diff = max(dot(norm, lightDir), 0.0);

  // Specular
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(norm, halfDir), 0.0), 24.0);

  // Composite beam color
  vec3 col = uBaseColor * 0.25 + uLightColor * (diff * 0.75 + spec * 0.45);

  // Subtle dither noise
  float dither = (random(gl_FragCoord.xy) - 0.5) * 0.05 * uNoiseIntensity;
  col += dither;

  // Soft vertical fade at edges
  float edgeFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
  float alpha = clamp(diff * 0.85 + spec * 0.5, 0.0, 1.0) * edgeFade * 0.85;

  fragColor = vec4(col, alpha);
}
`;

function createStackedPlanesGeometry(
  gl: OGLRenderingContext,
  n: number,
  width: number,
  height: number,
  spacing: number,
  heightSegments: number
) {
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const positions = new Float32Array(numVertices * 3);
  const uvs = new Float32Array(numVertices * 2);
  const indices = new Uint32Array(numFaces * 3);

  let vertexOffset = 0;
  let indexOffset = 0;
  let uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = i * 0.1;

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      const v0 = [xOffset, y, 0];
      const v1 = [xOffset + width, y, 0];
      positions.set([...v0, ...v1], vertexOffset * 3);

      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY, uvXOffset + 0.1, uvY], uvOffset);

      if (j < heightSegments) {
        const a = vertexOffset;
        const b = vertexOffset + 1;
        const c = vertexOffset + 2;
        const d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset);
        indexOffset += 6;
      }
      vertexOffset += 2;
      uvOffset += 4;
    }
  }

  return new Geometry(gl, {
    position: { size: 3, data: positions },
    uv: { size: 2, data: uvs },
    index: { data: indices },
  });
}

export default function Beams({
  beamWidth = 2.2,
  beamHeight = 16,
  beamNumber = 12,
  lightColor = "#7ec1e0",
  speed = 1.2,
  noiseIntensity = 1.6,
  scale = 0.18,
  rotation = -6,
  className = "",
  style,
}: BeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isReducedMotion =
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

    const camera = new Camera(gl, { fov: 30 });
    camera.position.set(0, 0, 20);

    const scene = new Transform();

    const geometry = createStackedPlanesGeometry(
      gl,
      beamNumber,
      beamWidth,
      beamHeight,
      0.15,
      90
    );

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: isReducedMotion ? 0 : speed },
      uNoiseIntensity: { value: noiseIntensity },
      uScale: { value: scale },
      uLightColor: { value: hexToRgb(lightColor) },
      uBaseColor: { value: hexToRgb("#1e293b") },
    };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
      cullFace: false,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.rotation.z = (rotation * Math.PI) / 180;
    mesh.setParent(scene);

    const resize = () => {
      if (!container) return;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 500;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let rafId: number | null = null;
    let prev = performance.now();
    let currentT = 0;

    const renderLoop = (now: number) => {
      if (!isReducedMotion) {
        rafId = requestAnimationFrame(renderLoop);
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - prev) / 1000));
      prev = now;

      if (!isReducedMotion) {
        currentT += dt;
        uniforms.uTime.value = currentT;
      } else {
        uniforms.uTime.value = 1.0; // Static posture
      }

      renderer.render({ scene, camera });
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
    beamWidth,
    beamHeight,
    beamNumber,
    lightColor,
    speed,
    noiseIntensity,
    scale,
    rotation,
  ]);

  return (
    <div
      ref={containerRef}
      className={`beams-container ${className}`.trim()}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden
    />
  );
}
