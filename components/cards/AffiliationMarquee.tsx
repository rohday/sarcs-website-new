import Image from "next/image";
import { getAffiliations } from "@/lib/data";
import type { Affiliation } from "@/lib/types";

function LogoCell({ affiliation }: { affiliation: Affiliation }) {
  return (
    <div className="marquee-cell">
      <a
        href={affiliation.url}
        target="_blank"
        rel="noopener noreferrer"
        title={affiliation.name}
        className="marquee-card"
      >
        <Image
          src={affiliation.logo}
          alt={affiliation.name}
          width={150}
          height={50}
          style={{
            maxHeight: "50px",
            maxWidth: "140px",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </a>
    </div>
  );
}

function LogoRow({ items, reverse }: { items: Affiliation[]; reverse?: boolean }) {
  // Duplicate 4x for a smooth infinite wrap at any screen width.
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-track${reverse ? " marquee-track-reverse" : ""}`}>
      {doubled.map((a, i) => (
        <LogoCell key={`${a.name}-${i}`} affiliation={a} />
      ))}
    </div>
  );
}

export default function AffiliationMarquee() {
  const affiliations = getAffiliations();
  const half = Math.ceil(affiliations.length / 2);

  return (
    <div style={{ overflow: "hidden", padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
      <div className="container">
        <span
          className="type-mono"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: "1.25rem",
            fontWeight: 600,
          }}
        >
          AFFILIATES &amp; PARTNERS
        </span>
        <div className="marquee-mask">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <LogoRow items={affiliations.slice(0, half)} />
            <LogoRow items={affiliations.slice(half)} reverse />
          </div>
        </div>
      </div>
    </div>
  );
}
