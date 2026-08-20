import Image from "next/image";
import { getAffiliations } from "@/lib/data";

export default function AffiliationMarquee() {
  const affiliations = getAffiliations();
  const half = Math.ceil(affiliations.length / 2);
  const row1 = affiliations.slice(0, half);
  const row2 = affiliations.slice(half);

  // Duplicate each row 4x for smooth infinite wrap on all screen widths
  const row1Items = [...row1, ...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2, ...row2];

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
            {/* Row 1: Right to left */}
            <div className="marquee-track">
              {row1Items.map((a, i) => (
                <div key={`r1-${a.name}-${i}`} className="marquee-cell">
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
              ))}
            </div>

            {/* Row 2: Left to right */}
            <div className="marquee-track marquee-track-reverse">
              {row2Items.map((a, i) => (
                <div key={`r2-${a.name}-${i}`} className="marquee-cell">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
