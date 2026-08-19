import Link from "next/link";
import Grainient from "@/components/backgrounds/Grainient";
import NoiseOverlay from "@/components/animations/NoiseOverlay";
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
        minHeight: "560px",
        maxHeight: "880px",
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
            maxWidth: "780px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
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
              gap: "clamp(2.5rem, 6vw, 4.5rem)",
              paddingTop: "1.75rem",
              marginTop: "0.25rem",
              borderTop: "1px solid var(--hairline)",
            }}
          >
            <div>
              <div
                className="tnum"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.625rem",
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
                  fontSize: "1.625rem",
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
