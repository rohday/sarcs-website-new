import type { Metadata } from "next";
import Link from "next/link";
import {
  getBlogs,
  getLabInfo,
  getAffiliations,
  getPublications,
  getNews,
} from "@/lib/data";
import Section from "@/components/ui/Section";
import LandingHero from "@/components/layout/LandingHero";
import PinnedPublications from "@/components/cards/PinnedPublications";
import AffiliationCard from "@/components/cards/AffiliationCard";

export const metadata: Metadata = {
  title: "Home",
  description:
    "SARCS Lab at IIIT Hyderabad — research in computer architecture, in-memory computing, RISC-V, quantum computing, and edge AI.",
};

export default function HomePage() {
  const labInfo = getLabInfo();
  const affiliations = getAffiliations();
  const publications = getPublications().slice(0, 8);
  const blogs = getBlogs();
  const news = getNews().slice(0, 3);

  return (
    <div>
      <LandingHero />

      {/* ─── About / Mission section (no redundant name repetition) ──────── */}
      <Section
        style={{
          paddingTop: "clamp(3rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div className="mission-split">
          <div>
            <h2 className="type-display-lg" style={{ margin: "0 0 1rem" }}>
              About the laboratory
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <p className="type-body-lg" style={{ margin: 0 }}>
              {labInfo.mission}
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.75rem",
                flexWrap: "wrap",
                paddingTop: "1rem",
                borderTop: "1px solid var(--hairline)",
              }}
            >
              <Link href="/people" className="text-link">
                Meet the team
              </Link>
              <Link href="/research" className="text-link">
                Research areas
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Pinned Double-Scroll Recent Publications ─────────────────────── */}
      <PinnedPublications publications={publications} />

      <Section style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <h2 className="type-display-md" style={{ margin: "0 0 1.75rem" }}>
          Affiliations &amp; partners
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {affiliations.map((affiliation, idx) => (
            <AffiliationCard key={idx} affiliation={affiliation} />
          ))}
        </div>
      </Section>

      {(news.length > 0 || blogs.length > 0) && (
        <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "1rem",
              flexWrap: "wrap",
              borderBottom: "1px solid var(--hairline)",
              paddingBottom: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <h2 className="type-display-md" style={{ margin: 0 }}>
              Dispatches
            </h2>
            <Link href="/media" className="text-link">
              All media
            </Link>
          </div>

          {news.map((item) => (
            <article
              key={item.id}
              style={{
                padding: "1.25rem 0",
                borderBottom: "1px solid var(--hairline)",
              }}
              className="pub-strip"
            >
              <span
                className="type-mono tnum"
                style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
              >
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 0.35rem",
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                style={{ whiteSpace: "nowrap" }}
              >
                Read
              </a>
            </article>
          ))}

          {blogs.slice(0, 2).map((post) => (
            <article
              key={post.id}
              style={{
                padding: "1.25rem 0",
                borderBottom: "1px solid var(--hairline)",
              }}
              className="blog-strip"
            >
              <span
                className="type-mono tnum"
                style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    margin: "0 0 0.35rem",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {post.description}
                </p>
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                style={{ whiteSpace: "nowrap" }}
              >
                Read
              </a>
            </article>
          ))}
        </Section>
      )}
    </div>
  );
}
