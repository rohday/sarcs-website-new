import Image from "next/image";
import type { MediaItem } from "@/lib/types";

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  if (!items || items.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 0",
          border: "1px dashed var(--hairline-strong)",
          borderRadius: "4px",
        }}
      >
        <p className="type-mono" style={{ margin: 0 }}>
          No media items available
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
        gap: "1.5rem",
      }}
    >
      {items.map((item) => (
        <figure
          key={item.id}
          className="surface-card"
          style={{
            margin: 0,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "4px",
              overflow: "hidden",
              background: "var(--substrate-hi)",
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 720px) 100vw, 340px"
            />
          </div>
          <figcaption
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {item.caption}
              {item.event ? ` · ${item.event}` : ""}
            </span>
            <span
              className="type-mono tnum"
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {item.date}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
