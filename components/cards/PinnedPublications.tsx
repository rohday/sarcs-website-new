"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Publication } from "@/lib/types";
import PublicationItem from "@/components/cards/PublicationItem";

export default function PinnedPublications({
  publications,
}: {
  publications: Publication[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Pinned double-scroll effect calculation on scroll
  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateScroll = () => {
      if (!containerRef.current || !windowRef.current || !listRef.current) return;
      if (window.innerWidth <= 768 || isReducedMotion) {
        listRef.current.style.transform = "none";
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      const totalDistance = containerHeight - windowHeight;
      if (totalDistance <= 0) return;

      const scrolledDistance = -containerTop;
      const progress = Math.min(
        Math.max(scrolledDistance / totalDistance, 0),
        1
      );

      const listHeight = listRef.current.scrollHeight;
      const visibleHeight = windowRef.current.clientHeight;
      const maxTranslate = Math.max(listHeight - visibleHeight, 0);

      listRef.current.style.transform = `translateY(-${progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Recent publications"
      className="pinned-pubs-section"
      style={{
        position: "relative",
        minHeight: "250vh",
      }}
    >
      <div
        className="pinned-pubs-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5rem 0 3rem",
        }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxHeight: "80vh",
          }}
        >
          {/* Header inside pinned window */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "1rem",
              flexWrap: "wrap",
              borderBottom: "1px solid var(--hairline)",
              paddingBottom: "0.75rem",
              marginBottom: "0.75rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <h2 className="type-display-md" style={{ margin: 0 }}>
                Recent publications
              </h2>
              <span
                className="type-mono"
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                (Scroll to browse {publications.length} recent)
              </span>
            </div>
            <Link
              href="/publications"
              className="text-link"
              style={{
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                border: "1px solid var(--hairline)",
                background: "var(--substrate-card)",
              }}
            >
              Full archive <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>

          {/* Scrollable list window */}
          <div
            ref={windowRef}
            style={{
              flex: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              ref={listRef}
              style={{
                willChange: "transform",
              }}
            >
              {publications.map((pub) => (
                <PublicationItem key={pub.id} publication={pub} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
