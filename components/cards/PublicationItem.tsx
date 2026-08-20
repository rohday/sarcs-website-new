import type { Publication } from "@/lib/types";
import { getPublicationVenueLabel } from "@/lib/data";

export default function PublicationItem({
  publication,
  detailed = false,
}: {
  publication: Publication;
  detailed?: boolean;
}) {
  const venueLabel = getPublicationVenueLabel(publication);

  const links = [
    { href: publication.links.doi, label: "DOI" },
    { href: publication.links.arxiv, label: "arXiv" },
    { href: publication.links.pdf, label: "PDF" },
    { href: publication.links.code, label: "Code" },
    { href: publication.links.googleScholar, label: "Scholar" },
  ].filter((l) => l.href);

  const primaryLink =
    publication.links.doi ||
    publication.links.arxiv ||
    publication.links.pdf ||
    publication.links.googleScholar;

  if (detailed) {
    return (
      <article
        style={{
          padding: "1.75rem 0",
          borderBottom: "1px solid var(--hairline)",
          display: "grid",
          gridTemplateColumns: publication.abstract
            ? "minmax(0, 1.25fr) minmax(0, 1fr)"
            : "1fr",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          alignItems: "start",
        }}
        className="pub-detailed-row"
      >
        {/* Left Column: Conference name before year above paper, title, authors, venue, links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {/* Conference name right before the year above paper */}
          <span
            className="type-mono"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: "0.06em",
              marginBottom: "0.15rem",
            }}
          >
            {venueLabel}
          </span>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.0625rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
            }}
          >
            {primaryLink ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {publication.title}
              </a>
            ) : (
              publication.title
            )}
          </h3>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            {publication.authors.join(", ")}
          </p>

          <p
            className="type-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              margin: "0.15rem 0 0",
              lineHeight: 1.5,
            }}
          >
            {publication.venue}
          </p>

          {links.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                paddingTop: "0.5rem",
              }}
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Basic abstract to the right of the text */}
        {publication.abstract && (
          <div style={{ paddingTop: "1.35rem" }}>
            <p
              style={{
                fontSize: "0.84375rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {publication.abstract}
            </p>
          </div>
        )}
      </article>
    );
  }

  // Compact strip for homepage PinnedPublications
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
          color: "var(--accent)",
          whiteSpace: "nowrap",
          fontWeight: 600,
        }}
      >
        {venueLabel}
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
            {l.label}
          </a>
        ))}
      </div>
    </article>
  );
}
