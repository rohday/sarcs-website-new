# Design Spec: Media & Dispatches Hero with Beams

## Overview
Add a dedicated, atmospheric hero section to the **Media & Dispatches** page (`/media`) featuring the **Beams** component implemented with `ogl` (no new npm dependencies), a lighter substrate top background tint that smoothly fades into the dark page background, and guaranteed high-contrast text legibility.

## Visual & Color Palette
- **Light Color:** `#7ec1e0` (SARCS Steel Blue accent)
- **Mid-tone Background:** `#1e293b` / `#2c4552` (Cool Slate / Twilight Substrate)
- **Base Ground:** `#10161a` (Standard Substrate)
- **Text Primary:** `#f0f4f8` (>= 16:1 contrast)
- **Text Secondary:** `#cbd5e1` (>= 12:1 contrast)

## Component Architecture

### 1. `components/backgrounds/Beams.tsx`
- **Framework:** `ogl` (Renderer, Program, Mesh, Geometry).
- **Geometry:** Stacked plane strips with subdivided height segments.
- **Shader:**
  - Vertex shader: Multi-octave 3D simplex noise displacing plane vertices along Z axis based on time, scale, and speed.
  - Normal computation: Analytic normal derivation from displaced positions for directional lighting.
  - Fragment shader: Directional light diffuse + specular reflection with dithered noise overlay for texture.
- **Props:**
  - `beamWidth?: number` (default: 2.2)
  - `beamHeight?: number` (default: 16)
  - `beamNumber?: number` (default: 12)
  - `lightColor?: string` (default: `#7ec1e0`)
  - `speed?: number` (default: 1.2)
  - `noiseIntensity?: number` (default: 1.6)
  - `scale?: number` (default: 0.18)
  - `rotation?: number` (default: -6)
- **Accessibility:** Respects `prefers-reduced-motion` by freezing time animation to a static posture.

### 2. `components/layout/MediaHero.tsx`
- Replaces standard `PageHeader` on `/media`.
- **Top Layer 0:** Background container with lighter substrate tint (`#1e293b` -> `#2c4552`).
- **Layer 1:** `<Beams />` canvas with bottom dissolve `maskImage: linear-gradient(to bottom, black 0%, black 70%, transparent 100%)`.
- **Layer 2:** Dark scrim overlay (`linear-gradient(180deg, rgba(11,15,18,0.20) 0%, rgba(11,15,18,0.50) 50%, rgba(16,22,26,0.92) 85%, #10161a 100%)`).
- **Layer 3:** Unboxed typography:
  - Label: `SARCS / DISPATCHES` (JetBrains Mono, `#7ec1e0`)
  - Heading: `Media & Dispatches` (Inter, `#f0f4f8`, `clamp(2rem, 4.5vw, 3.5rem)`)
  - Description: `Paper acceptances, conference appearances, and life inside the laboratory.` (Inter, `#cbd5e1`)

### 3. Page Integration (`app/media/page.tsx`)
- Embeds `<MediaHero />` at the top of the page.
- Subsequent sections (News Log, Gallery) flow naturally on the `#10161a` substrate below the hero fade.

## Verification Criteria
- `npm run check` passes.
- `npm run lint` passes (0 errors, 0 warnings).
- `npm run build` static export passes (all 8 routes prerendered).
- Contrast ratio >= 7:1 for headings, >= 4.5:1 for body copy.
- Mobile viewport (`390px`) verified with zero horizontal overflow.
