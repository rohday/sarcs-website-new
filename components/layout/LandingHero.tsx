import Link from "next/link";
import Grainient from "@/components/backgrounds/Grainient";
import NoiseOverlay from "@/components/animations/NoiseOverlay";
import { getLabInfo, getDistinctVenueCount, getActiveProjects } from "@/lib/data";

export default function LandingHero() {
  const lab = getLabInfo();
  const stats = lab.stats;
  const venueCount = getDistinctVenueCount();
  const activeProjects = getActiveProjects();

  const coreThrusts = [
    {
      num: "01",
      title: "In-Memory Computing",
      desc: "Digital & mixed-signal SRAM CiM overcoming the von Neumann bottleneck.",
      href: "/research#in-memory-computing",
    },
    {
      num: "02",
      title: "RISC-V Architectures",
      desc: "Custom open-source processor cores & matrix/vector accelerator extensions.",
      href: "/research#riscv-architectures",
    },
    {
      num: "03",
      title: "Quantum Interfaces",
      desc: "4-Kelvin cryogenic analog signal chains & qubit control readout systems.",
      href: "/research#quantum-computing",
    },
    {
      num: "04",
      title: "Hardware Accelerators",
      desc: "Domain-specific systolic arrays & energy-efficient edge AI autonomy.",
      href: "/research#hardware-accelerators",
    },
  ];

  return (
    <section
      aria-label="SARCS Lab overview"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "620px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "clamp(5rem, 9vh, 7rem)",
        paddingBottom: "clamp(3rem, 6vh, 4.5rem)",
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
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
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

      {/* ─── Layer 3: Hero content (balanced split grid utilizing full margins) ─── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <div className="hero-split">
          {/* Left Column: Title & Mission */}
          <div
            className="fade-up-entry"
            style={{
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
              <h1 className="type-display-xl" style={{ margin: 0, maxWidth: "18ch" }}>
                {lab.fullName}
              </h1>
            </div>

            <p
              className="type-body-lg"
              style={{ margin: 0, color: "var(--text-secondary)", maxWidth: "58ch" }}
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
                Research areas
              </Link>
              <Link href="/people" className="text-link">
                People
              </Link>
              <Link href="/publications" className="text-link">
                Publications
              </Link>
            </div>
          </div>

          {/* Right Column: Research Focus Thrusts index utilizing right margin */}
          <div
            className="fade-up-entry"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
              background: "rgba(23, 29, 34, 0.55)",
              border: "1px solid var(--hairline)",
              borderRadius: "6px",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              <span
                className="type-mono"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Core Research Thrusts
              </span>
              <span
                className="type-mono"
                style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}
              >
                IIIT Hyderabad
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {coreThrusts.map((thrust) => (
                <Link
                  key={thrust.num}
                  href={thrust.href}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                    padding: "0.5rem 0.6rem",
                    borderRadius: "4px",
                    transition: "background 0.18s ease",
                  }}
                  className="thrust-item"
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span
                      className="type-mono tnum"
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--accent)",
                        fontWeight: 600,
                      }}
                    >
                      {thrust.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {thrust.title}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      margin: 0,
                      lineHeight: 1.45,
                      paddingLeft: "1.45rem",
                    }}
                  >
                    {thrust.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom Stats Row spanning across the wide container ─── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(2rem, 5vw, 5rem)",
            paddingTop: "2rem",
            marginTop: "2.5rem",
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
              {activeProjects.length}
            </div>
            <div
              className="type-mono"
              style={{
                fontSize: "0.75rem",
                marginTop: "0.25rem",
                color: "var(--text-muted)",
              }}
            >
              Active research tracks
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
    </section>
  );
}
