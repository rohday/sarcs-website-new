import Image from "next/image";
import type { Affiliation } from "@/lib/types";

export default function AffiliationCard({
  affiliation,
}: {
  affiliation: Affiliation;
}) {
  return (
    <a
      href={affiliation.url}
      target="_blank"
      rel="noopener noreferrer"
      title={affiliation.name}
      className="surface-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.625rem",
        padding: "1.25rem",
        textDecoration: "none",
        minHeight: "6rem",
      }}
    >
      <Image
        src={affiliation.logo}
        alt=""
        width={120}
        height={44}
        style={{
          maxHeight: "44px",
          maxWidth: "120px",
          objectFit: "contain",
          width: "auto",
          height: "auto",
          filter: "brightness(0.95)",
        }}
      />
      <span
        className="type-mono"
        style={{
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        {affiliation.name}
      </span>
    </a>
  );
}
