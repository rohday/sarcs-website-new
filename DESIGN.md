---
name: SARCS Lab — The Silicon Floorplan
description: A research-lab website drawn as a chip floorplan: placed research blocks, routed interconnect pins, and a pad-ring of lab statistics on deep silicon.
colors:
  substrate: "#101319"
  substrate-hi: "#161a23"
  substrate-deep: "#0c0e13"
  oxide: "#f2efe6"
  metal: "#7fb3d5"
  metal-deep: "#4d7fa3"
  interconnect: "#c9a35c"
  alarm: "#e5484d"
  text-secondary: "#b8c6d4"
  text-muted: "#8b9cac"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.12em"
    textTransform: "uppercase"
rounded:
  sm: "3px"
  md: "4px"
spacing:
  xs: "0.5rem"
  sm: "0.875rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
components:
  pad:
    backgroundColor: "rgba(127, 179, 213, 0.06)"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.9rem"
  pad-active:
    backgroundColor: "rgba(201, 163, 92, 0.08)"
    textColor: "{colors.interconnect}"
    rounded: "{rounded.sm}"
  die-block:
    backgroundColor: "{colors.substrate}"
    textColor: "{colors.oxide}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.oxide} @ 14% alpha"
  stat-pad:
    backgroundColor: "rgba(16, 19, 25, 0.72)"
    textColor: "{colors.oxide}"
    rounded: "{rounded.sm}"
    padding: "0.7rem 0.9rem"
---

# Design System: SARCS Lab — The Silicon Floorplan

## Overview

**Creative North Star: "The Silicon Floorplan"**

The SARCS website is drawn the way a chip designer reads a die: placed blocks, routed interconnect, mask-layer annotation, and a pad ring of measured statistics. Every page is a floorplan region of the same die; nothing pretends to be photography. The world is honest engineering graphics — the visitor sees the actual structures of the lab's research (In-Memory Computing, RISC-V, Quantum, Edge AI) laid out as labeled cells with pins routed to their evidence, never stock imagery of someone else's hardware.

The palette is silicon materials on deep substrate: oxide-white markings, metal-blue interconnects, and one warm interconnect-gold reserved for the active trace. The type system pairs a confident engineering grotesque (Archivo) with a measurement mono (JetBrains Mono) used only where an engineer would write data — cell codes, dates, stats, labels. Dark is not a mood choice; it is the substrate color of the mask-grid the world is drawn on, the screen a layout editor sits open on.

**Key Characteristics:**
- Placed-cell composition: content sits in bordered, labeled regions like die blocks, not floating cards.
- Routed interconnect: SVG traces with 45° miters and via dots draw from blocks toward their destinations; traces draw in once on load, then rest solid.
- Pad-ring data: statistics and controls sit in flat, hairline-bordered pads — never elevated, never glowing.
- Construction honesty: every annotation is real and readable; no decorative chrome, no fake hardware photos, no glass.
- One authored motion moment: the pin-trace draw-in. Everything else is state feedback (border color, flat fill shift).

## Colors

Silicon materials on a deep substrate. Oxide white carries the typography; metal blue carries structure and links; interconnect gold is the single active voice; alarm red appears only for errors and alerts.

### Primary
- **Interconnect Gold** (#c9a35c): The active trace. Active pads, the primary action, hover accents, focus rings. Used on a minority of any surface — its rarity is the point.
- **Oxide White** (#f2efe6): The primary text and label color. Paper-white markings on dark silicon.

### Secondary
- **Metal Blue** (#7fb3d5): Structure and links. Die labels, cell codes, default pin traces, link text, grid lines, borders on hover.

### Tertiary
- **Alarm Red** (#e5484d): Errors and alerts only. Never decoration.

### Neutral
- **Substrate** (#101319): The page ground, the die's dark silicon.
- **Substrate Hi** (#161a23): Raised fill behind photo cells.
- **Substrate Deep** (#0c0e13): Footer ground.
- **Text Secondary** (#b8c6d4): Body copy, tinted from the metal hue (≈7.2:1 on substrate).
- **Text Muted** (#8b9cac): Metadata, tinted from the metal hue (≈4.7:1 on substrate).

### Named Rules
**The Flat-By-Default Rule.** No element casts a shadow. Depth comes from hairline borders, tonal fills, and the grid — never from elevation. A zero-offset glow is decoration and is banned.
**The Gold Rarity Rule.** Interconnect gold marks the active thing only. Two gold accents on one viewport means neither is active.
**The Oxide Hairline Rule.** Borders and dividers are oxide white at low alpha (14% at rest, 30% at emphasis) — never gray, never black-on-black.

## Typography

**Display Font:** Archivo (with ui-sans-serif, system-ui fallback)
**Body Font:** Archivo (same family)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono fallback)

**Character:** A confident engineering grotesque paired with a measurement mono. Archivo's squared, workmanlike letterforms carry the lab's credibility; JetBrains Mono is reserved for the annotations an engineer would actually write — never for body prose, never as a "tech costume."

### Hierarchy
- **Display** (700, clamp(2.75rem→5.5rem), 1.02, -0.02em): The SARCS wordmark. One per page, hero only.
- **Headline** (600, clamp(2rem→3.25rem), 1.08): Page titles and major section statements.
- **Title** (600, clamp(1.35rem→1.75rem), 1.2): Block titles and card headings.
- **Body** (400, 0.9375rem, 1.7): Prose; max measure 72ch.
- **Label** (400, 0.6875rem, 0.12em, uppercase): Die labels, cell codes, stats, dates, pad text.

### Named Rules
**The No-Eyebrow Rule.** No label sits above a heading. The heading carries its own weight; a die-label may sit beside or below it as annotation, never above it as a teaser.
**The Mono Means Measurement Rule.** JetBrains Mono appears only where a number, code, date, or label is being read — stats, edge codes, tags, navigation. Body copy and long prose are always Archivo.

## Layout

A single centered container (max 1180px, padding 1.25–3rem) holds every die region. The hero die is a bordered panel drawn on a fine mask-grid; its blocks collapse 3 → 2 → 1 columns at 900px / 600px. All supporting grids — footer, mission split, contact, featured person, publication strips — collapse to one column at 768px. Spacing rhythm is generous above headings, tight below them: section padding clamp(3rem→5rem), card padding clamp(1.25rem→2rem).

Navigation is a fixed header: the SARCS wordmark left, route pads right. On mobile the pad row scrolls horizontally — no burger, no dropdown.

## Elevation & Depth

**The Flat-By-Default Rule.** This system is flat. Depth is conveyed by tonal layering (substrate → substrate-hi fills), hairline borders, and the mask-grid — the same cues a layout editor uses to show which layer is active. There are no shadows anywhere in the system.

## Shapes

Gently curved corners: 3px for small elements (pads, cell codes), 4px for panels (die, blocks, figures). Borders are 1px hairlines at oxide 14% alpha, rising to 30% for emphasized rules. The pin trace is the signature geometry: an SVG polyline with 45° mitered corners and a circular via dot at its end, drawn once with a stroke-dashoffset animation on load and resting as a solid line.

## Components

### Pads (buttons / chips / filters / nav)
- **Shape:** flat, 3px radius, 1px hairline border.
- **Default:** metal-tinted fill (metal blue at 6%), secondary text.
- **Hover:** border shifts to metal blue, text to oxide, fill to 10% metal.
- **Active:** border and text become interconnect gold, fill 8% gold.
- **Focus:** 2px gold outline, 3px offset.

### Die Blocks (research cells / project cards / member cells)
- **Corner Style:** 4px.
- **Background:** substrate with a subtle metal-blue gradient wash at the top.
- **Border:** 1px hairline; hover shifts to metal blue and nudges 2px up.
- **Internal Padding:** clamp(1.25rem → 1.875rem).
- **Header:** cell code (mono, bordered) left, status or index right.

### Stat Pads (pad ring)
- **Shape:** 3px radius, 1px hairline border, 72%-opacity substrate fill.
- **Content:** value in mono (tabular numerals), unit label in tiny tracked mono below.

### Pin Links (actions / external links)
- Mono uppercase text with a 6px via dot before it. Hover shifts metal blue → interconnect gold. The dot is drawn, never an emoji.

### Navigation
- Fixed header, substrate background, hairline bottom border. Wordmark left; route pads right. Active route wears the gold pad. Mobile: horizontal scroll, no menu state.

### The Hero Die (signature component)
The homepage first viewport: a full-width bordered panel on a mask-grid. Top strip carries the die label and the SARCS wordmark; the middle holds six research-area cells in a 3×2 placement; the bottom pad ring carries the lab's statistics and one primary action ("Explore research"). Each cell routes a pin trace toward the pad ring. Real lab photography can later sit beneath this schematic as a layer, but the schematic never pretends to be a photo.

## Do's and Don'ts

### Do:
- **Do** draw every figure as a flat, hairline-bordered cell on the grid.
- **Do** reserve interconnect gold for the active element — one per viewport.
- **Do** set statistics in JetBrains Mono with tabular numerals.
- **Do** keep one authored motion moment (the trace draw-in) and nothing more.
- **Do** theme browser surfaces — selection, scrollbar, focus rings — from the palette.

### Don't:
- **Don't** use gradients, glass, backdrop-blur, glow, or drop shadows anywhere.
- **Don't** place a label above a heading — the heading carries itself.
- **Don't** use monospace for body prose or as a tech costume.
- **Don't** ship stock photography of hardware the lab does not own; schematic truth beats fake realism.
- **Don't** let any element overflow the viewport horizontally — grids collapse via CSS media queries, never inline grid definitions.