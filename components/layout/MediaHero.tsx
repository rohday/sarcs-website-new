import Beams from "@/components/backgrounds/Beams";

export default function MediaHero() {
  return (
    <section
      aria-label="Media & Dispatches hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "420px",
        maxHeight: "560px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ─── Layer 0: Lighter top substrate background tint ─────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, #1e293b 0%, #17202a 50%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 1: Animated Beams with bottom dissolve mask ─────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      >
        <Beams
          lightColor="#7ec1e0"
          beamNumber={12}
          speed={1.2}
          noiseIntensity={1.6}
          scale={0.18}
          rotation={-6}
        />
      </div>

      {/* ─── Layer 2: Dark scrim overlay for guaranteed text contrast ──────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(11, 15, 18, 0.20) 0%, rgba(11, 15, 18, 0.45) 50%, rgba(16, 22, 26, 0.90) 80%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 3: Hero content ────────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingTop: "3rem",
          paddingBottom: "2.5rem",
        }}
      >
        <div
          className="fade-up-entry"
          style={{
            maxWidth: "760px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
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
