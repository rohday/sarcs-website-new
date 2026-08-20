"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Grainient from "@/components/backgrounds/Grainient";
import labInfo from "@/data/lab.json";

const TARGET_LETTERS = ["S", "A", "R", "C", "S"];
const FULL_NAME = (labInfo.fullName || "Sustainable, Advanced and Robust Computing Systems").toUpperCase();

const MIN_DISPLAY_MS = 2600; // minimum display time ~2600ms
const WATCHDOG_MS = 6000;    // watchdog 6s force-reveal fallback
const GATE_COUNT = 4;        // hydration, min time, fonts, hero images

const noopSubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

function getPreloadSnapshot() {
  try {
    if (typeof window === "undefined") return false;
    return (
      sessionStorage.getItem("sarcs-preload") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

function usePreloadSkipped() {
  return useSyncExternalStore(
    noopSubscribe,
    getPreloadSnapshot,
    () => false
  );
}

export default function Preloader() {
  const hydrated = useHydrated();
  const skipped = usePreloadSkipped();

  // Parallel readiness gates
  const [minElapsed, setMinElapsed] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Reveal & lifecycle phase
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);

  // Typography stagger & typewriter state
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [typewriterLen, setTypewriterLen] = useState(0);

  // 1. Lock body scroll while overlay is active
  useEffect(() => {
    if (skipped || hidden) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skipped, hidden]);

  // 2. Parallel readiness gates & watchdog
  useEffect(() => {
    if (skipped || hidden) return;

    const minTimer = setTimeout(() => setMinElapsed(true), MIN_DISPLAY_MS);
    const watchdog = setTimeout(() => {
      setForceReveal(true);
      setMinElapsed(true);
      setFontsLoaded(true);
      setImagesLoaded(true);
    }, WATCHDOG_MS);

    if (document.fonts?.ready) {
      document.fonts.ready.then(
        () => setFontsLoaded(true),
        () => setFontsLoaded(true)
      );
    } else {
      queueMicrotask(() => setFontsLoaded(true));
    }

    const loadImage = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true); // never block on broken image
        img.src = src;
      });

    const heroImages = (labInfo.heroImages as string[]) || [];
    if (heroImages.length > 0) {
      Promise.all(heroImages.map(loadImage)).then(() => setImagesLoaded(true));
    } else {
      queueMicrotask(() => setImagesLoaded(true));
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(watchdog);
    };
  }, [skipped, hidden]);

  // 3. Stagger sequence: letters appear ~90ms apart
  useEffect(() => {
    if (skipped || hidden) return;

    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < TARGET_LETTERS.length) {
          return prev + 1;
        }
        clearInterval(letterInterval);
        return prev;
      });
    }, 90);

    return () => clearInterval(letterInterval);
  }, [skipped, hidden]);

  // 4. Typewriter sequence: start after SARCS letters settle (~600ms)
  useEffect(() => {
    if (skipped || hidden || visibleLetters < TARGET_LETTERS.length) return;

    const delayTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        setTypewriterLen((prev) => {
          if (prev < FULL_NAME.length) {
            return prev + 1;
          }
          clearInterval(typeInterval);
          return prev;
        });
      }, 35);
    }, 150);

    return () => clearTimeout(delayTimer);
  }, [skipped, hidden, visibleLetters]);

  // 5. Readiness calculation
  const completed = [hydrated, minElapsed, fontsLoaded, imagesLoaded].filter(Boolean).length;
  const isReady = completed === GATE_COUNT || forceReveal;

  // 6. Reveal sequence: wipe curtain up when all gates pass
  useEffect(() => {
    if (!isReady || skipped || hidden || loaded) return;

    try {
      sessionStorage.setItem("sarcs-preload", "1");
    } catch {
      // sessionStorage unavailable
    }

    const tLoad = setTimeout(() => {
      setLoaded(true);
      document.body.style.overflow = "";
    }, 50);

    const tHide = setTimeout(() => {
      setHidden(true);
    }, 900);

    return () => {
      clearTimeout(tLoad);
      clearTimeout(tHide);
    };
  }, [isReady, skipped, hidden, loaded]);

  if (skipped || hidden) return null;

  return (
    <aside
      id="sarcs-preloader"
      aria-label="Loading SARCS Lab"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#10161a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
        transform: loaded ? "translateY(-100%)" : "translateY(0%)",
        pointerEvents: loaded ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* ─── Layer 0: Static Grainient (no animation) ─── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Grainient
          timeSpeed={0}
          warpSpeed={0}
          color1="#909090"
          color2="#2c4552"
          color3="#2f384c"
        />
      </div>

      {/* ─── Layer 1: Linear-gradient scrim fading to #10161a ─── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(11, 15, 18, 0.25) 0%, rgba(11, 15, 18, 0.55) 45%, rgba(16, 22, 26, 0.92) 80%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 2: Preloader Content Sequence ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1.5rem",
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        {/* Large Centered SARCS letters staggering in */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#ffffff",
            lineHeight: 1,
            textShadow: "0 0 30px rgba(255, 255, 255, 0.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: loaded ? 0 : 1,
            transform: loaded ? "scale(0.96)" : "scale(1)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {TARGET_LETTERS.map((letter, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                opacity: idx < visibleLetters ? 1 : 0,
                transform: idx < visibleLetters ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                padding: "0 0.05em",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Typewritten Full Name */}
        <div
          className="type-mono"
          style={{
            fontSize: "clamp(0.625rem, 1.2vw, 0.6875rem)",
            letterSpacing: "0.18em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            marginTop: "1.75rem",
            minHeight: "1.5em",
            lineHeight: 1.5,
            opacity: loaded ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {FULL_NAME.slice(0, typewriterLen)}
          {typewriterLen > 0 && typewriterLen < FULL_NAME.length && (
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "0.85em",
                backgroundColor: "var(--accent)",
                marginLeft: "4px",
                verticalAlign: "middle",
                animation: "pulse 0.8s infinite",
              }}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
