/**
 * PinTrace — a routed interconnect trace (SVG polyline with via dots),
 * drawn in the floorplan world's grammar: 45° miters, Manhattan routing.
 * The trace draws itself once on load (trace-anim) and warms to gold when
 * its parent has :hover (see globals.css .die-block).
 *
 * variant "block": short trace from the cell's right edge toward the pad
 * ring, terminating in a via + open stub. Decorative where paired with a
 * real link label; never the only affordance.
 */
export default function PinTrace({ variant = "block" }: { variant?: "block" | "plain" }) {
  if (variant === "plain") {
    return (
      <svg
        className="pin-trace trace-anim"
        width="100%"
        height="14"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        aria-hidden
      >
<path
        d="M0 7 H 150 L 170 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        pathLength={1}
      />
      </svg>
    );
  }

  return (
    <svg
      className="pin-trace trace-anim"
      width="100%"
      height="18"
      viewBox="0 0 200 18"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 9 H 130 L 150 3 H 178"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
      <circle cx="178" cy="3" r="2" fill="currentColor" />
    </svg>
  );
}
