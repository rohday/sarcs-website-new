/**
 * Publications page — the paper archive die.
 * Year groups act as layer strips; every publication is a logged record
 * with edge code, authors, venue, and routed links.
 */
import type { Metadata } from "next";
import { getPublications, getLabInfo } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import PublicationItem from "@/components/cards/PublicationItem";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Publications from the SARCS Lab at IIIT Hyderabad — journals, conference papers, and preprints in computer architecture, in-memory computing, and AI systems.",
};

export default function PublicationsPage() {
  const publications = getPublications();
  const labInfo = getLabInfo();

  const byYear = publications.reduce<Record<number, typeof publications>>(
    (acc, pub) => {
      if (!acc[pub.year]) acc[pub.year] = [];
      acc[pub.year].push(pub);
      return acc;
    },
    {}
  );

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <PageHeader
        dieLabel="Paper archive · complete record"
        title="Publications"
        description="Peer-reviewed journal articles, conference papers, and preprints, grouped by year."
      >
        <a
          href={labInfo.socialLinks.googleScholar}
          target="_blank"
          rel="noopener noreferrer"
          className="pin-link"
        >
          <span className="via" aria-hidden />
          Google Scholar profile
        </a>
      </PageHeader>

      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {years.map((year) => (
            <div key={year}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  borderBottom: "1px solid var(--hairline-strong)",
                  paddingBottom: "0.5rem",
                  marginBottom: "0.25rem",
                }}
              >
                <span className="type-mono tnum" style={{ fontSize: "1rem", color: "var(--metal)" }}>{year}</span>
                <span className="type-mono" style={{ fontSize: "0.625rem" }}>
                  {byYear[year].length} RECORD{byYear[year].length === 1 ? "" : "S"}
                </span>
              </div>
              <div>
                {byYear[year].map((pub) => (
                  <PublicationItem key={pub.id} publication={pub} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
