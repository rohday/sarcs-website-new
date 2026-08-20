import Image from "next/image";
import { getAffiliations } from "@/lib/data";

export default function AffiliationMarquee() {
  const affiliations = getAffiliations();

  return (
    <div style={{ overflow: "hidden", padding: "clamp(1.5rem, 3vw, 2.5rem) 0" }}>
      <div className="container">
        <span
          className="type-mono"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          AFFILIATES & PARTNERS
        </span>
      </div>
      <div className="marquee-mask">
        <div className="marquee-track">
          {[...affiliations, ...affiliations].map((a, i) => (
            <a
              key={`${a.name}-${i}`}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              title={a.name}
              className="marquee-cell"
            >
              <Image
                src={a.logo}
                alt={a.name}
                width={120}
                height={32}
                style={{
                  height: "32px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0.95)",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
