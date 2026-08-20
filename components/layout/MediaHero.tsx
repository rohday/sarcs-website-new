import Beams from "@/components/backgrounds/Beams";

export default function MediaHero() {
  return (
    <section
      aria-label="Media & Dispatches hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "560px",
        maxHeight: "720px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ─── Layer 0: Lighter, colorful gradient background ──────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, #2c4552 0%, #253945 35%, #1b2630 65%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 1: ReactBits Three.js/R3F Beams (Full width & height) ─── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        }}
      >
        <Beams
          beamWidth={10}
          beamHeight={15}
          beamNumber={12}
          lightColor="#d3eeff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* ─── Layer 2: Dark scrim overlay for guaranteed high-contrast text ─ */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(11, 15, 18, 0.15) 0%, rgba(11, 15, 18, 0.40) 45%, rgba(16, 22, 26, 0.88) 80%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 3: Hero content brought down with generous spacing ────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingTop: "5.5rem",
          paddingBottom: "3.5rem",
        }}
      >
        <div
          className="fade-up-entry"
          style={{
            maxWidth: "760px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <span
            className="type-mono"
            style={{
              fontSize: "0.8125rem",
              color: "var(--accent)",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            SARCS / DISPATCHES
          </span>
          <h1 className="type-display-xl" style={{ margin: 0 }}>
            Media &amp; Dispatches
          </h1>
          <p
            className="type-body-lg"
            style={{ margin: 0, color: "var(--text-secondary)" }}
          >
            Paper acceptances, conference appearances, and life inside the laboratory.
          </p>
        </div>
      </div>
    </section>
  );
}
