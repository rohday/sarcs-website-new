"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PixelSwap.css";

export interface PixelSwapProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  trigger?: "hover" | "click" | "auto";
  pattern?: "edges" | "random" | "center" | "diagonal";
  pixelSize?: number;
  gap?: number;
  pixelRadius?: number;
  duration?: number;
  pixelDuration?: number;
  fade?: boolean;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  pixelColor?: string;
}

interface PixelInfo {
  id: number;
  row: number;
  col: number;
  delayIn: number;
  delayOut: number;
}

export default function PixelSwap({
  firstContent,
  secondContent,
  trigger = "hover",
  pattern = "edges",
  pixelSize = 32,
  gap = 2,
  pixelRadius = 8,
  duration = 1200,
  pixelDuration = 450,
  fade = true,
  aspectRatio = "3/4",
  className = "",
  style = {},
  pixelColor = "var(--substrate-hi, #171d22)",
}: PixelSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isSwapped, setIsSwapped] = useState(false);
  const [displayIndex, setDisplayIndex] = useState<0 | 1>(0);
  const [pixelsActive, setPixelsActive] = useState(false);
  const [pixelsVisible, setPixelsVisible] = useState<boolean[]>([]);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending timeouts
  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Track container dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setDimensions({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Compute grid columns, rows, and pixel delays
  const { cols, rows, pixels } = React.useMemo(() => {
    const w = dimensions.width || 240;
    const h = dimensions.height || 320;
    const colCount = Math.max(1, Math.ceil(w / (pixelSize + gap)));
    const rowCount = Math.max(1, Math.ceil(h / (pixelSize + gap)));

    const list: PixelInfo[] = [];
    const maxDelay = Math.max(0, (duration / 2) - pixelDuration);

    let maxDist = 1;
    if (pattern === "edges") {
      maxDist = Math.max(1, Math.min(rowCount, colCount) / 2);
    } else if (pattern === "center") {
      maxDist = Math.max(1, Math.hypot(rowCount / 2, colCount / 2));
    } else if (pattern === "diagonal") {
      maxDist = Math.max(1, rowCount + colCount);
    }

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        let dist = 0;
        if (pattern === "edges") {
          dist = Math.min(r, rowCount - 1 - r, c, colCount - 1 - c);
        } else if (pattern === "center") {
          dist = Math.hypot(r - rowCount / 2, c - colCount / 2);
        } else if (pattern === "diagonal") {
          dist = r + c;
        } else if (pattern === "random") {
          // Pure pseudo-random hash calculation
          dist = (((r * 41 + c * 19 + 7) % 97) / 97) * maxDist;
        }

        const normalized = Math.min(1, Math.max(0, dist / maxDist));
        const delayIn = normalized * maxDelay;
        const delayOut = (1 - normalized) * maxDelay;

        list.push({
          id: r * colCount + c,
          row: r,
          col: c,
          delayIn,
          delayOut,
        });
      }
    }

    return { cols: colCount, rows: rowCount, pixels: list };
  }, [dimensions, pixelSize, gap, duration, pixelDuration, pattern]);

  // Run the full pixel swap animation
  const runSwap = useCallback(
    (toSwapped: boolean) => {
      clearTimeouts();
      setPixelsActive(true);

      const targetDisplay = toSwapped ? 1 : 0;
      const initialVisibility = new Array(pixels.length).fill(false);
      setPixelsVisible(initialVisibility);

      // Phase 1: Assemble pixels to cover content
      pixels.forEach((p) => {
        const tIn = setTimeout(() => {
          setPixelsVisible((prev) => {
            const next = [...prev];
            next[p.id] = true;
            return next;
          });
        }, p.delayIn);
        timeoutRefs.current.push(tIn);
      });

      // Midpoint: Swap content behind the assembled pixels
      const midpoint = duration / 2;
      const tMid = setTimeout(() => {
        setDisplayIndex(targetDisplay);
        setIsSwapped(toSwapped);

        // Phase 2: Dissolve pixels away
        pixels.forEach((p) => {
          const tOut = setTimeout(() => {
            setPixelsVisible((prev) => {
              const next = [...prev];
              next[p.id] = false;
              return next;
            });
          }, p.delayOut);
          timeoutRefs.current.push(tOut);
        });
      }, midpoint);
      timeoutRefs.current.push(tMid);

      // End: Deactivate pixel overlay
      const tEnd = setTimeout(() => {
        setPixelsActive(false);
      }, duration);
      timeoutRefs.current.push(tEnd);
    },
    [clearTimeouts, pixels, duration]
  );

  const handleMouseEnter = () => {
    if (trigger === "hover" && !isSwapped) {
      runSwap(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover" && isSwapped) {
      runSwap(false);
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      runSwap(!isSwapped);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pixel-swap-container ${className}`}
      style={{
        aspectRatio,
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Active Content */}
      <div
        className="pixel-swap-content"
        style={{
          opacity: 1,
          transition: fade ? "opacity 0.2s ease" : "none",
        }}
      >
        {displayIndex === 0 ? firstContent : secondContent}
      </div>

      {/* Animated Pixel Tiles Grid */}
      {pixelsActive && (
        <div
          className="pixel-swap-grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {pixels.map((p) => (
            <div
              key={p.id}
              className={`pixel-swap-tile ${pixelsVisible[p.id] ? "pixel-visible" : ""}`}
              style={
                {
                  "--pixel-dur": `${pixelDuration}ms`,
                  backgroundColor: pixelColor,
                  borderRadius: `${pixelRadius}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
