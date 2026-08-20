import NoiseOverlay from "@/components/animations/NoiseOverlay";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function PageHeader({
  title,
  description,
  children,
  style,
}: PageHeaderProps) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        paddingTop: "calc(4.5rem + clamp(2.5rem, 5vh, 4rem))",
        paddingBottom: "clamp(3rem, 6vw, 4.5rem)",
        ...style,
      }}
    >
      {/* ─── Layer 0: Lighter, deep blue tinted background with smooth bottom fade ─── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, #1e2d3b 0%, #172430 45%, #131d25 75%, #10161a 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
        }}
      />

      {/* ─── Layer 1: Living canvas film-grain noise overlay ─────────────── */}
      <NoiseOverlay patternAlpha={16} patternRefreshInterval={2} />

      {/* ─── Layer 2: Subtle bottom dissolve scrim ───────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(16, 22, 26, 0.10) 0%, rgba(16, 22, 26, 0.35) 60%, #10161a 100%)",
        }}
      />

      {/* ─── Layer 3: Header content ─────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <h1
          className="type-display-lg fade-up-entry"
          style={{ margin: 0, maxWidth: "26ch" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="type-body-lg fade-up-entry"
            style={{
              margin: "1.25rem 0 0",
              maxWidth: "60ch",
              color: "var(--text-secondary)",
            }}
          >
            {description}
          </p>
        )}
        {children && (
          <div style={{ marginTop: "1.5rem" }} className="fade-up-entry">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
