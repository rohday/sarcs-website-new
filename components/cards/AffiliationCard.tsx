/**
 * AffiliationCard — a partner chip on the pad ring.
 * Real logos on a flat cell; name below the mark for screen readers
 * and for partners whose logo is wordless.
 */
import Image from "next/image";
import type { Affiliation } from "@/lib/types";

export default function AffiliationCard({ affiliation }: { affiliation: Affiliation }) {
  return (
    <a
      href={affiliation.url}
      target="_blank"
      rel="noopener noreferrer"
      title={affiliation.name}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "1rem 1.25rem",
        border: "1px solid var(--hairline)",
        borderRadius: "4px",
        background: "var(--substrate)",
        textDecoration: "none",
        transition: "border-color 0.2s ease",
        minHeight: "5.5rem",
      }}
      className="partner-chip"
    >
      <Image
        src={affiliation.logo}
        alt=""
        width={120}
        height={44}
        style={{ maxHeight: "44px", maxWidth: "120px", objectFit: "contain", width: "auto", height: "auto", filter: "grayscale(0.2) brightness(0.95)" }}
      />
      <span className="type-mono" style={{ fontSize: "0.5625rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
        {affiliation.name.toUpperCase()}
      </span>
    </a>
  );
}
