# Media Hero Beams Integration & Gallery Streamlining Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the animated `<Beams />` component built with OGL into a dedicated Media Hero section on `/media` with a lighter-to-dark gradient background fade, high-contrast text, and remove selectable category filter buttons from the gallery.

**Architecture:** 
1. Build `components/backgrounds/Beams.tsx` using `ogl` for stacked plane geometries with 3D simplex noise displacement and normal calculation.
2. Build `components/layout/MediaHero.tsx` containing the lighter top substrate background, Beams layer with bottom dissolve mask, dark scrim overlay, and unboxed typography.
3. Remove category filter buttons in `components/cards/MediaGallery.tsx`.
4. Embed `MediaHero` in `app/media/page.tsx`.

**Tech Stack:** Next.js 14 (App Router, static export), OGL, TypeScript, Tailwind CSS.

## Global Constraints
- No new npm dependencies (use existing `ogl`).
- Static export compatibility (`output: "export"`).
- Maintain WCAG contrast: primary text >= 7:1, secondary/muted >= 4.5:1.
- Respect `prefers-reduced-motion` (freeze animation into static posture).
- One h1 per page, valid accessibility tags.

---

### Task 1: Implement `Beams.tsx` with OGL

**Files:**
- Create: `components/backgrounds/Beams.tsx`

**Interfaces:**
- Produces: `default export function Beams(props: BeamsProps)`
  - `beamWidth?: number`
  - `beamHeight?: number`
  - `beamNumber?: number`
  - `lightColor?: string`
  - `speed?: number`
  - `noiseIntensity?: number`
  - `scale?: number`
  - `rotation?: number`
  - `className?: string`
  - `style?: CSSProperties`

- [ ] **Step 1: Write `Beams.tsx` component**
- [ ] **Step 2: Verify component compiles with zero lint errors**
- [ ] **Step 3: Commit component**

---

### Task 2: Create `MediaHero.tsx`

**Files:**
- Create: `components/layout/MediaHero.tsx`

**Interfaces:**
- Consumes: `Beams` from `components/backgrounds/Beams.tsx`
- Produces: `default export function MediaHero()`

- [ ] **Step 1: Write `MediaHero.tsx` with lighter substrate top, Beams layer, bottom dissolve mask, dark scrim, and unboxed typography**
- [ ] **Step 2: Verify component compiles with zero lint errors**
- [ ] **Step 3: Commit component**

---

### Task 3: Streamline `MediaGallery.tsx`

**Files:**
- Modify: `components/cards/MediaGallery.tsx`

**Interfaces:**
- Produces: `default export function MediaGallery({ items }: { items: MediaItem[] })`

- [ ] **Step 1: Remove category buttons and state from `MediaGallery.tsx`, rendering all items directly in the grid**
- [ ] **Step 2: Verify component compiles with zero lint errors**
- [ ] **Step 3: Commit component**

---

### Task 4: Integrate `MediaHero` in `app/media/page.tsx`

**Files:**
- Modify: `app/media/page.tsx`

**Interfaces:**
- Consumes: `MediaHero` from `components/layout/MediaHero.tsx`

- [ ] **Step 1: Replace `PageHeader` with `MediaHero` in `app/media/page.tsx`**
- [ ] **Step 2: Verify component compiles with zero lint errors**
- [ ] **Step 3: Commit changes**

---

### Task 5: Verification, Design Docs & Build

**Files:**
- Modify: `DESIGN.md`
- Modify: `.impeccable/design.json`

- [ ] **Step 1: Run `npm run check` and `npm run lint`**
- [ ] **Step 2: Run `npm run build` to verify static export succeeds**
- [ ] **Step 3: Update `DESIGN.md` and `.impeccable/design.json`**
- [ ] **Step 4: Commit and push to `origin main`**
