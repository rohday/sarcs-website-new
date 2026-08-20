import type { Metadata } from "next";
import { getMedia, getNews } from "@/lib/data";
import MediaHero from "@/components/layout/MediaHero";
import Section from "@/components/ui/Section";
import MediaGallery from "@/components/cards/MediaGallery";

export const metadata: Metadata = {
  title: "Media",
  description:
    "News and photo gallery from the SARCS Lab at IIIT Hyderabad — conferences, events, and lab life.",
};

export default function MediaPage() {
  const media = getMedia();
  const news = getNews();

  return (
    <div>
      <MediaHero />

      {news.length > 0 && (
        <Section style={{ paddingTop: "clamp(2.5rem, 5vw, 4rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <h2
            className="type-display-md"
            style={{ margin: "0 0 1.5rem" }}
          >
            News Log
          </h2>
          <div>
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
          </div>
        </Section>
      )}

      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <h2
          className="type-display-md"
          style={{ margin: "0 0 1.5rem" }}
        >
          Gallery
        </h2>
        <MediaGallery items={media} />
      </Section>
    </div>
  );
}
