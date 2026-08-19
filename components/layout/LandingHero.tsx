import Link from "next/link";
import Grainient from "@/components/backgrounds/Grainient";
import HalftoneReveal from "@/components/hero/HalftoneReveal";
import { getLabInfo, getDistinctVenueCount } from "@/lib/data";

export default function LandingHero() {
  const lab = getLabInfo();
  const stats = lab.stats;
  const venueCount = getDistinctVenueCount();

  return (
    <section
      aria-label="SARCS Lab overview"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        minHeight: "600px",
        maxHeight: "920px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ─── Background Grainient WebGL layer with bottom dissolve mask ───── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        }}
      >
        <Grainient />
      </div>

      {/* ─── Halftone cursor interactive hue reveal overlay ───────────────── */}
      <HalftoneReveal style={{ zIndex: 1 }} />

      {/* ─── Dark scrim overlay for guaranteed legibility ──────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(11, 15, 18, 0.25) 0%, rgba(11, 15, 18, 0.55) 50%, rgba(16, 22, 26, 0.95) 85%, #10161a 100%)",
        }}
      />

      {/* ─── Hero content ─────────────────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingTop: "4rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          className="fade-up-entry"
          style={{
            maxWidth: "760px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
            background: "rgba(16, 22, 26, 0.55)",
            border: "1px solid var(--hairline)",
            borderRadius: "6px",
          }}
        >
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

          <p
            className="type-body-lg"
            style={{ margin: 0, color: "var(--text-secondary)" }}
          >
            {lab.tagline || lab.mission}
          </p>

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
              Research areas <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link href="/people" className="text-link">
              People <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link href="/publications" className="text-link">
              Publications <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(2rem, 5vw, 4rem)",
              paddingTop: "1.5rem",
              marginTop: "0.25rem",
              borderTop: "1px solid var(--hairline)",
            }}
          >
            <div>
              <div
                className="tnum"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {venueCount}
              </div>
              <div
                className="type-mono"
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.25rem",
                  color: "var(--text-muted)",
                }}
              >
                Venues represented
              </div>
            </div>

            <div>
              <div
                className="tnum"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {stats.since}
              </div>
              <div
                className="type-mono"
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.25rem",
                  color: "var(--text-muted)",
                }}
              >
                Established
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
