"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Publication } from "@/lib/types";
import PublicationItem from "@/components/cards/PublicationItem";
import AsciiWaves from "@/components/animations/AsciiWaves";

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
      if (window.innerWidth <= 900 || isReducedMotion) {
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
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(2rem, 5vw, 4.5rem)",
            alignItems: "center",
            height: "100%",
            maxHeight: "82vh",
          }}
        >
          {/* Left column: Recent publications list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "1rem",
                flexWrap: "wrap",
                borderBottom: "1px solid var(--hairline)",
                paddingBottom: "0.875rem",
                marginBottom: "0.75rem",
                flexShrink: 0,
              }}
            >
              <h2 className="type-display-md" style={{ margin: 0 }}>
                Recent publications
              </h2>
              <Link
                href="/publications"
                className="text-link"
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "999px",
                  border: "1px solid var(--hairline)",
                  background: "rgba(23, 29, 34, 0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                Full archive
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

          {/* Right column: AsciiWaves ambient animation (no enclosing box) */}
          <div
            className="pubs-ascii-column"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: "380px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              pointerEvents: "none",
            }}
            aria-hidden
          >
            <AsciiWaves
              fontSize={12}
              waveSpeed={0.7}
              waveFrequency={0.04}
              waveAmplitude={24}
              color="#7ec1e0"
              secondaryColor="#94a3b8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
