/**
 * Media page — news strip + photo gallery die.
 * News entries log lab events; the gallery shows real frames with
 * edge codes and captions. Data-driven from news.json / media.json.
 */
import type { Metadata } from "next";
import { getMedia, getNews } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import MediaGallery from "@/components/cards/MediaGallery";

export const metadata: Metadata = {
  title: "Media",
  description: "News and photo gallery from the SARCS Lab at IIIT Hyderabad — conferences, events, and lab life.",
};

export default function MediaPage() {
  const media = getMedia();
  const news = getNews();

  return (
    <div>
      <PageHeader
        dieLabel="Dispatches · news and frames"
        title="Media"
        description="Paper acceptances, conference appearances, and life inside the lab."
      />

      {/* News strip */}
      {news.length > 0 && (
        <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <p className="die-label" style={{ marginBottom: "1.25rem" }}>News log</p>
          <div>
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
          </div>
        </Section>
      )}

      {/* Gallery */}
      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <p className="die-label" style={{ marginBottom: "1.25rem" }}>Frames from the lab</p>
        <MediaGallery items={media} />
      </Section>
    </div>
  );
}
