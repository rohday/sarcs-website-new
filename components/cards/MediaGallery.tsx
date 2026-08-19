"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { MediaItem } from "@/lib/types";

/**
 * MediaGallery — the media die region. Category pads route the gallery;
 * every frame is a real photo with its own edge code and caption.
 */
export default function MediaGallery({ items }: { items: MediaItem[] }) {
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={active === c ? "pad pad-active" : "pad"}
            style={{ fontSize: "0.6875rem", cursor: "pointer", background: "var(--substrate)", textTransform: "uppercase", letterSpacing: "0.06em" }}
            aria-pressed={active === c}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((item) => (
            <figure
              key={item.id}
              style={{
                margin: 0,
                border: "1px solid var(--hairline)",
                borderRadius: "4px",
                padding: "0.875rem",
                background: "var(--substrate)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "3px", overflow: "hidden", background: "var(--substrate-hi)" }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 720px) 100vw, 340px"
                />
              </div>
              <figcaption style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline" }}>
                <span className="type-mono" style={{ fontSize: "0.625rem", color: "var(--text-secondary)" }}>
                  {item.caption}
                  {item.event ? ` · ${item.event}` : ""}
                </span>
                <span className="type-mono tnum" style={{ fontSize: "0.625rem", whiteSpace: "nowrap" }}>
                  {item.date}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 0", border: "1px dashed var(--hairline-strong)", borderRadius: "4px" }}>
          <p className="type-mono" style={{ margin: 0 }}>NO FRAMES IN THIS CATEGORY YET</p>
        </div>
      )}
    </div>
  );
}
