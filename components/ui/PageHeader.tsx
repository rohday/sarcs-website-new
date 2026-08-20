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
        paddingTop: "calc(4rem + clamp(2.5rem, 5vh, 4rem))",
        paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
        ...style,
      }}
    >
      <div className="container">
        <h1
          className="type-display-lg fade-up-entry"
          style={{ margin: 0, maxWidth: "24ch" }}
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
