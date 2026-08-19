import Link from "next/link";
import type { LabInfo } from "@/lib/types";

/**
 * Footer — bottom die region: brand block, route pads, contact cell,
 * then the legal strip along the pad ring.
 */
export default function Footer({ labInfo }: { labInfo: LabInfo }) {
  const year = new Date().getFullYear();

  const routes = [
    { href: "/research",     label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/people",       label: "People" },
    { href: "/media",        label: "Media" },
  ];

  const socials = [
    { href: labInfo.socialLinks.googleScholar, label: "Scholar" },
    { href: labInfo.socialLinks.github,        label: "GitHub" },
    { href: labInfo.socialLinks.linkedin,      label: "LinkedIn" },
    { href: labInfo.socialLinks.youtube,       label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer style={{ borderTop: "1px solid var(--hairline)", background: "var(--substrate-deep)", padding: "clamp(2.5rem, 5vw, 4rem) 0 0" }}>
      <div className="container">
        <div
          style={{ paddingBottom: "3rem" }}
          className="footer-grid"
        >
          {/* Brand block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.625rem" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.375rem", letterSpacing: "0.06em", color: "var(--oxide)" }}>
                SARCS
              </span>
            </Link>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--text-secondary)", maxWidth: "42ch", margin: 0 }}>
              {labInfo.fullName}. International Institute of Information Technology, Hyderabad.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.375rem" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="pad" style={{ fontSize: "0.625rem", textDecoration: "none" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Index */}
          <nav aria-label="Footer navigation">
            <p className="die-label" style={{ margin: "0 0 1rem" }}>Index</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {routes.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="pin-link" style={{ fontSize: "0.6875rem" }}>
                    <span className="via" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact cell */}
          <div>
            <p className="die-label" style={{ margin: "0 0 1rem" }}>Contact</p>
            <p style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "var(--text-secondary)", margin: "0 0 0.875rem" }}>
              {labInfo.contact.address.slice(0, 3).map((line) => (
                <span key={line} style={{ display: "block" }}>{line}</span>
              ))}
            </p>
            <a href={`mailto:${labInfo.contact.email}`} className="pin-link" style={{ fontSize: "0.6875rem" }}>
              <span className="via" aria-hidden />
              {labInfo.contact.email}
            </a>
          </div>
        </div>

        {/* Legal strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            borderTop: "1px solid var(--hairline)",
            padding: "1.25rem 0 1.5rem",
          }}
        >
          <span className="type-mono" style={{ fontSize: "0.625rem" }}>© {year} SARCS LAB · IIIT HYDERABAD</span>
          <span className="type-mono" style={{ fontSize: "0.625rem" }}>SARCSLAB.ORG</span>
        </div>
      </div>
    </footer>
  );
}
