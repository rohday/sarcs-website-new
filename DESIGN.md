---
name: SARCS Lab — Calm Developer System
description: A calm, minimal, spacious research-lab website modeled on a modern developer aesthetic, featuring a 16:9 scoped film-grain gradient hero window, dynamic dock navigation, pinned double-scroll publications, Inter typography, and flat hairline surfaces.
colors:
  substrate: "#10161a"
  substrate-trans: "rgba(16, 22, 26, 0.65)"
  substrate-hi: "#171d22"
  substrate-deep: "#0b0f12"
  substrate-card: "rgba(23, 29, 34, 0.60)"
  accent: "#7ec1e0"
  accent-muted: "#5b9ab9"
  alarm: "#e5484d"
  text-primary: "#f0f4f8"
  text-secondary: "#cbd5e1"
  text-muted: "#94a3b8"
  hairline: "rgba(233, 237, 241, 0.14)"
  hairline-strong: "rgba(233, 237, 241, 0.28)"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.85rem, 3.8vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  metadata:
    fontFamily: "JetBrains Mono, ui-monospace, 'SF Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.04em"
rounded:
  sm: "3px"
  md: "4px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.875rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
components:
  chip:
    backgroundColor: "rgba(23, 29, 34, 0.60)"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "0.35rem 0.75rem"
    border: "1px solid rgba(233, 237, 241, 0.14)"
  chip-active:
    backgroundColor: "rgba(126, 193, 224, 0.15)"
    textColor: "{colors.text-primary}"
    border: "1px solid #7ec1e0"
  surface-card:
    backgroundColor: "rgba(23, 29, 34, 0.60)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    border: "1px solid rgba(233, 237, 241, 0.14)"
---

# Design System: SARCS Lab — Calm Developer System

## Overview

**Creative North Star: "Calm Developer System"**

Modeled on a modern, quiet developer aesthetic (referencing the DeepSeek Harness developer landing). The first thing visitors land on is spacious, breathable, and clear.

Key patterns:
1. **Scoped 16:9 Hero Grainient:** The WebGL film-grain gradient background is scoped strictly to a 16:9 viewport window on the homepage with an overlaid dark scrim for guaranteed text contrast. All other pages render on a solid substrate background.
2. **Transparent Top Nav to Sticky Pill Dock:** Top navigation links float in individual hairline pill boxes over the hero, condensing smoothly into a centered sticky pill dock on scroll.
3. **Double-Scroll Publications:** On the homepage, the Recent Publications section pins to the viewport as the user scrolls, smoothly translating the newest 8 publications before unlocking into subsequent sections.
4. **Clean Typography & Elevated Contrast:** Inter is used for all primary text, while JetBrains Mono is strictly reserved for metadata. Colors are tuned to exceed WCAG AA/AAA contrast ratios (Primary >= 16:1, Secondary >= 12:1, Muted >= 7:1).
5. **Spread-out Multi-Column Footer:** Broad multi-column layout separating lab description, navigation index, contact/address, and external profiles.

## Colors

- **Substrate Base** (`#10161a`): Primary background substrate.
- **Substrate Deep** (`#0b0f12`): Footer ground and base background.
- **Substrate Card** (`rgba(23, 29, 34, 0.60)`): Slightly translucent surface for cards, panels, and chips.
- **Text Primary** (`#f0f4f8`): High-contrast primary headings and active elements (16.5:1 on substrate).
- **Text Secondary** (`#cbd5e1`): Body copy and descriptions (12.5:1 on substrate).
- **Text Muted** (`#94a3b8`): Dates, counts, and metadata (7.2:1 on substrate).
- **Accent** (`#7ec1e0`): Steel-blue accent for links and active states (9.6:1 on substrate).
- **Alarm Red** (`#e5484d`): Reserved exclusively for errors and alerts.

## Typography

- **Display & Body Font:** Inter (`var(--font-inter)`)
- **Metadata Font:** JetBrains Mono (`var(--font-jbmono)`)

## Do's and Don'ts

### Do:
- **Do** scope WebGL Grainient to the home 16:9 hero window and keep other pages on solid substrate.
- **Do** ensure all text colors exceed WCAG contrast thresholds against actual rendered backgrounds.
- **Do** maintain smooth transitions for the floating-to-dock navigation.
- **Do** provide non-pinned static fallbacks for double-scroll on mobile and for `prefers-reduced-motion`.

### Don't:
- **Don't** mount WebGL canvas on non-home pages.
- **Don't** use glow, glassmorphism, backdrop-blur, gradient text, or drop shadows.
- **Don't** place artificial labels or eyebrows above headings.