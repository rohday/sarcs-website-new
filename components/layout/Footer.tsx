import Link from "next/link";
import type { LabInfo } from "@/lib/types";

export default function Footer({ labInfo }: { labInfo: LabInfo }) {
  const year = new Date().getFullYear();

  const routes = [
    { href: "/research", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/people", label: "People" },
    { href: "/media", label: "Media" },
  ];

  const socials = [
    { href: labInfo.socialLinks.googleScholar, label: "Google Scholar" },
    { href: labInfo.socialLinks.github, label: "GitHub" },
    { href: labInfo.socialLinks.linkedin, label: "LinkedIn" },
    { href: labInfo.socialLinks.youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer
      style={{
        borderTop: "1px solid var(--hairline)",
        background: "var(--substrate-deep)",
        padding: "clamp(3.5rem, 7vw, 5rem) 0 0",
      }}
    >
      <div className="container">
        <div style={{ paddingBottom: "3.5rem" }} className="footer-grid">
          {/* Col 1: Lab Overview */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "baseline",
                gap: "0.625rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "0.04em",
                  color: "var(--text-primary)",
                }}
              >
                SARCS
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                maxWidth: "38ch",
                margin: 0,
              }}
            >
              {labInfo.fullName}. International Institute of Information
              Technology, Hyderabad.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <nav aria-label="Footer navigation">
            <h2
              className="type-mono"
              style={{
                margin: "0 0 1rem",
                color: "var(--text-primary)",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              Navigation
            </h2>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {routes.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-link">
                    {label} <span className="arrow" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Contact & Address (Spread out) */}
          <div>
            <h2
              className="type-mono"
              style={{
                margin: "0 0 1rem",
                color: "var(--text-primary)",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              Contact &amp; Location
            </h2>
            <address
              style={{
                fontStyle: "normal",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                margin: "0 0 1rem",
              }}
            >
              {labInfo.contact.address.slice(0, 3).map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </address>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href={`mailto:${labInfo.contact.email}`}
                className="text-link"
              >
                {labInfo.contact.email} <span className="arrow" aria-hidden>→</span>
              </a>
              <a
                href={labInfo.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Campus Map <span className="arrow" aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Col 4: Links & Profiles */}
          <div>
            <h2
              className="type-mono"
              style={{
                margin: "0 0 1rem",
                color: "var(--text-primary)",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              Profiles
            </h2>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    {s.label} <span className="arrow" aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            borderTop: "1px solid var(--hairline)",
            padding: "1.75rem 0 2rem",
          }}
        >
          <span className="type-mono" style={{ fontSize: "0.75rem" }}>
            © {year} SARCS LAB · IIIT HYDERABAD
          </span>
          <span className="type-mono" style={{ fontSize: "0.75rem" }}>
            SARCSLAB.ORG
          </span>
        </div>
      </div>
    </footer>
  );
}
