/**
 * PageHeader — page opener in floorplan grammar.
 * A die label names the page class; the heading speaks for itself.
 * No eyebrows above headings (craft floor).
 */
interface PageHeaderProps {
  dieLabel: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function PageHeader({ dieLabel, title, description, children, style }: PageHeaderProps) {
  return (
    <section style={{ paddingTop: "4.5rem", paddingBottom: "clamp(2.5rem, 4vw, 4rem)", ...style }}>
      <div className="container">
        <p className="die-label" style={{ marginBottom: "1.25rem" }}>{dieLabel}</p>
        <h1 className="type-display-lg" style={{ margin: 0, maxWidth: "20ch" }}>{title}</h1>
        {description && (
          <p className="type-body-lg" style={{ margin: "1.5rem 0 0" }}>{description}</p>
        )}
        {children && <div style={{ marginTop: "2rem" }}>{children}</div>}
      </div>
    </section>
  );
}
