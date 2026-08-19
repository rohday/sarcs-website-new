import type { Publication } from "@/lib/types";

export default function PublicationItem({
  publication,
}: {
  publication: Publication;
}) {
  const links = [
    { href: publication.links.doi, label: "DOI" },
    { href: publication.links.arxiv, label: "arXiv" },
    { href: publication.links.pdf, label: "PDF" },
    { href: publication.links.code, label: "Code" },
    { href: publication.links.googleScholar, label: "Scholar" },
  ].filter((l) => l.href);

  return (
    <article
      style={{
        padding: "1.25rem 0",
        borderBottom: "1px solid var(--hairline)",
      }}
      className="pub-strip"
    >
      <span
        className="type-mono tnum"
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {publication.year}
      </span>

      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.0625rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "0 0 0.35rem",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
          }}
        >
          {publication.title}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            margin: "0 0 0.25rem",
            lineHeight: 1.55,
          }}
        >
          {publication.authors.join(", ")}
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          {publication.venue}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "flex-end",
        }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            style={{ whiteSpace: "nowrap" }}
          >
            {l.label} <span className="arrow" aria-hidden>→</span>
          </a>
        ))}
      </div>
    </article>
  );
}
