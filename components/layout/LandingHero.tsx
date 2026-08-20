import Link from "next/link";
import Grainient from "@/components/backgrounds/Grainient";
import NoiseOverlay from "@/components/animations/NoiseOverlay";
import Reveal from "@/components/animations/Reveal";
import ChipDie3D from "@/components/hero/ChipDie3D";
import { getLabInfo } from "@/lib/data";

export default function LandingHero() {
  const lab = getLabInfo();

  return (
    <section
      aria-label="SARCS Lab overview"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "560px",
        maxHeight: "880px",
        aspectRatio: "16/9",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ─── Layer 0: Background Grainient WebGL layer (calm animated gradient) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      >
        <Grainient timeSpeed={0.6} warpSpeed={2.5} />
      </div>

      {/* ─── Layer 0.5: 3D chip wireframe ─────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <ChipDie3D />
      </div>

      {/* ─── Layer 1: Animated film-grain living noise overlay ────────────── */}
      <NoiseOverlay patternAlpha={18} patternRefreshInterval={2} />

      {/* ─── Layer 2: Dark scrim overlay for guaranteed text legibility ─────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(11, 15, 18, 0.20) 0%, rgba(11, 15, 18, 0.50) 45%, rgba(16, 22, 26, 0.90) 80%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 3: Hero content (elevated, unboxed typography) ─────────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingTop: "2.25rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          className="fade-up-entry"
          style={{
            maxWidth: "880px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span
                className="type-mono"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {lab.name}
              </span>
              <h1 className="type-display-xl" style={{ margin: 0 }}>
                {lab.fullName}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p
              className="type-body-lg"
              style={{ margin: 0, color: "var(--text-secondary)" }}
            >
              {lab.tagline || lab.mission}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.75rem",
                alignItems: "center",
                paddingTop: "0.25rem",
              }}
            >
              <Link href="/research" className="text-link">
                Research areas
              </Link>
              <Link href="/people" className="text-link">
                People
              </Link>
              <Link href="/publications" className="text-link">
                Publications
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div
              style={{
                paddingTop: "1.75rem",
                marginTop: "0.25rem",
                borderTop: "1px solid var(--hairline)",
                maxWidth: "620px",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                “Research is to see what everybody else has seen, and to think
                what nobody else has thought.”
              </blockquote>
              <div
                className="type-mono"
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                Albert Szent-Györgyi
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
