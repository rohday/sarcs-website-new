interface SectionProps {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Section({
  children,
  container = true,
  className = "",
  style,
}: SectionProps) {
  const cls = `section ${className}`.trim();

  if (!container) {
    return (
      <section className={cls} style={style}>
        {children}
      </section>
    );
  }

  return (
    <section className={cls} style={style}>
      <div className="container">{children}</div>
    </section>
  );
}
