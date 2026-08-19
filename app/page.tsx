/**
 * Home page — the SARCS die.
 * First viewport = FloorplanHero (placed research blocks, pad ring stats).
 * Below it, the die's supporting regions: mission, recent publications,
 * affiliations pad ring, and dispatches. All content data-driven.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogs, getLabInfo, getAffiliations, getPublications, getNews } from "@/lib/data";
import Section from "@/components/ui/Section";
import FloorplanHero from "@/components/floorplan/FloorplanHero";
import PublicationItem from "@/components/cards/PublicationItem";
import AffiliationCard from "@/components/cards/AffiliationCard";

export const metadata: Metadata = {
  title: "Home",
  description: "SARCS Lab at IIIT Hyderabad — research in computer architecture, in-memory computing, RISC-V, quantum computing, and edge AI.",
};

export default function HomePage() {
  const labInfo = getLabInfo();
  const affiliations = getAffiliations();
  const publications = getPublications().slice(0, 4);
  const blogs = getBlogs();
  const news = getNews().slice(0, 3);

  return (
    <div>
      <FloorplanHero />

      {/* ─── Mission region ──────────────────────────────────────────────── */}
      <Section style={{ paddingTop: "clamp(2rem, 5vw, 4rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div
          className="mission-split"
        >
          <div>
            <p className="die-label" style={{ marginBottom: "1.25rem" }}>About the lab</p>
            <h2 className="type-display-lg" style={{ margin: "0 0 1.5rem" }}>{labInfo.fullName}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p className="type-body-lg" style={{ margin: 0 }}>
              {labInfo.mission}
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", paddingTop: "1rem", borderTop: "1px solid var(--hairline)" }}>
              <Link href="/people" className="pin-link">
                <span className="via" aria-hidden />
                Meet the team
              </Link>
              <Link href="/research" className="pin-link">
                <span className="via" aria-hidden />
                Research areas
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Recent publications region ──────────────────────────────────── */}
      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "1rem",
            flexWrap: "wrap",
            borderBottom: "1px solid var(--hairline)",
            marginBottom: "0.5rem",
          }}
        >
          <h2 className="type-display-md" style={{ margin: 0 }}>Recent publications</h2>
          <Link href="/publications" className="pin-link">
            <span className="via" aria-hidden />
            Full archive
          </Link>
        </div>
        <div>
          {publications.map((pub) => (
            <PublicationItem key={pub.id} publication={pub} />
          ))}
        </div>
      </Section>

      {/* ─── Affiliations pad ring ───────────────────────────────────────── */}
      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <h2 className="type-display-md" style={{ margin: "0 0 2rem" }}>Affiliations &amp; partners</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "0.875rem",
          }}
        >
          {affiliations.map((affiliation, idx) => (
            <AffiliationCard key={idx} affiliation={affiliation} />
          ))}
        </div>
      </Section>

      {/* ─── Dispatches: news + blog ─────────────────────────────────────── */}
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
              marginBottom: "0.5rem",
            }}
          >
            <h2 className="type-display-md" style={{ margin: 0 }}>Dispatches</h2>
            <Link href="/media" className="pin-link">
              <span className="via" aria-hidden />
              All media
            </Link>
          </div>

          {news.map((item) => (
            <article
              key={item.id}
              style={{
                padding: "1.1rem 0",
                borderBottom: "1px solid var(--hairline)",
              }}
              className="pub-strip"
            >
              <span className="type-mono tnum" style={{ fontSize: "0.6875rem", whiteSpace: "nowrap" }}>
                {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--oxide)", margin: "0 0 0.3rem", lineHeight: 1.45 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.55 }}>
                  {item.description}
                </p>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="pin-link" style={{ fontSize: "0.625rem", whiteSpace: "nowrap" }}>
                <span className="via" aria-hidden />
                Read
              </a>
            </article>
          ))}

          {blogs.slice(0, 2).map((post) => (
            <article
              key={post.id}
              style={{
                padding: "1.1rem 0",
                borderBottom: "1px solid var(--hairline)",
              }}
              className="pub-strip"
            >
              <span className="type-mono tnum" style={{ fontSize: "0.6875rem", whiteSpace: "nowrap" }}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--oxide)", margin: "0 0 0.3rem", lineHeight: 1.45 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.55 }}>
                  {post.description}
                </p>
              </div>
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="pin-link" style={{ fontSize: "0.625rem", whiteSpace: "nowrap" }}>
                <span className="via" aria-hidden />
                Read
              </a>
            </article>
          ))}
        </Section>
      )}
    </div>
  );
}
