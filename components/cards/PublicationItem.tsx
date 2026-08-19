/**
 * PublicationItem — a layer strip in the publications die.
 * Edge code = year + type; the entry carries title, authors, venue, and
 * routed links. The strip reads like a logged record, not a card.
 */
import type { Publication } from "@/lib/types";

const TYPE_CODE: Record<Publication["type"], string> = {
  journal: "JRN",
  conference: "CNF",
  preprint: "PRE",
  workshop: "WRK",
};

export default function PublicationItem({ publication }: { publication: Publication }) {
  const links = [
    { href: publication.links.doi,           label: "DOI" },
    { href: publication.links.arxiv,         label: "arXiv" },
    { href: publication.links.pdf,           label: "PDF" },
    { href: publication.links.code,          label: "Code" },
    { href: publication.links.googleScholar, label: "Scholar" },
  ].filter((l) => l.href);

  return (
    <article
      style={{
        padding: "1.1rem 0",
        borderBottom: "1px solid var(--hairline)",
      }}
      className="pub-strip"
    >
      <span className="die-cell-code tnum" style={{ whiteSpace: "nowrap" }}>
        {publication.year}·{TYPE_CODE[publication.type]}
      </span>

      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--oxide)", margin: "0 0 0.3rem", lineHeight: 1.45, letterSpacing: "-0.005em" }}>
          {publication.title}
        </h3>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: "0 0 0.25rem", lineHeight: 1.55 }}>
          {publication.authors.join(", ")}
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.03em", color: "var(--text-muted)", margin: 0 }}>
          {publication.venue}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "flex-end" }}>
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pin-link" style={{ fontSize: "0.625rem" }}>
            <span className="via" aria-hidden />
            {l.label}
          </a>
        ))}
      </div>
    </article>
  );
}
