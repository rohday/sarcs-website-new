import Image from "next/image";
import { getAffiliations } from "@/lib/data";

export default function AffiliationMarquee() {
  const affiliations = getAffiliations();

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
          <div className="marquee-track">
            {[...affiliations, ...affiliations].map((a, i) => (
              <div key={`${a.name}-${i}`} className="marquee-cell">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={a.name}
                  className="marquee-card"
                >
                  <Image
                    src={a.logo}
                    alt={a.name}
                    width={120}
                    height={36}
                    style={{
                      maxHeight: "36px",
                      maxWidth: "110px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
