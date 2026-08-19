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
        title="Publications"
        description="Peer-reviewed journal articles, conference papers, and preprints, grouped by year."
      >
        <a
          href={labInfo.socialLinks.googleScholar}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Google Scholar profile <span className="arrow" aria-hidden>→</span>
        </a>
      </PageHeader>

      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
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
                <span
                  className="type-mono tnum"
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {year}
                </span>
                <span
                  className="type-mono"
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  {byYear[year].length} {byYear[year].length === 1 ? "publication" : "publications"}
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
