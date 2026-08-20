import React from "react";
import Image from "next/image";

/**
 * LabLogo — renders the official SARCS Lab mark.
 * SWAP POINT: Replace /images/SARCS_Logo.png here when new vector/brand assets are provided.
 */
export default function LabLogo({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`lab-logo-container ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "120px",
        width: "100%",
        ...style,
      }}
    >
      <Image
        src="/images/SARCS_Logo.png"
        alt="SARCS Lab logo"
        draggable={false}
        width={180}
        height={100}
        priority
        style={{
          maxHeight: "110px",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))",
        }}
      />
    </div>
  );
}
