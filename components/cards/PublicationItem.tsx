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
        className="surface-card"
        style={{
          padding: "clamp(1.25rem, 3vw, 1.75rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Top bar: Venue Acronym Badge + Type + Action Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              className="type-mono"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.04em",
                background: "rgba(126, 193, 224, 0.12)",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                border: "1px solid rgba(126, 193, 224, 0.28)",
              }}
            >
              {venueLabel}
            </span>
            {publication.type && (
              <span
                className="chip"
                style={{
                  fontSize: "0.6875rem",
                  padding: "0.2rem 0.5rem",
                  textTransform: "capitalize",
                }}
              >
                {publication.type}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.125rem",
              alignItems: "center",
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
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: "-0.015em",
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

        {/* Authors */}
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

        {/* Full Venue details */}
        <p
          className="type-mono"
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {publication.venue}
        </p>

        {/* Abstract */}
        {publication.abstract && (
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.65,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "75ch",
            }}
          >
            {publication.abstract}
          </p>
        )}

        {/* Tags */}
        {publication.tags && publication.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              paddingTop: "0.25rem",
            }}
          >
            {publication.tags.map((tag) => (
              <span
                key={tag}
                className="chip"
                style={{
                  fontSize: "0.6875rem",
                  padding: "0.2rem 0.5rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    );
  }

  // Default compact strip for homepage PinnedPublications
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
