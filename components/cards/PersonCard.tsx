"use client";

import { useState } from "react";
import Image from "next/image";
import type { Member, Faculty, PersonLinks } from "@/lib/types";

const linkEntries = [
  { key: "email", label: "Email", href: (v: string) => `mailto:${v}` },
  { key: "googleScholar", label: "Scholar", href: (v: string) => v },
  { key: "github", label: "GitHub", href: (v: string) => v },
  { key: "linkedin", label: "LinkedIn", href: (v: string) => v },
] as const;

function PersonLinksList({ links }: { links: PersonLinks }) {
  const visible = linkEntries.filter((i) => links[i.key]);
  if (visible.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {visible.map((i) => (
        <a
          key={i.key}
          href={i.href(links[i.key]!)}
          target={i.key === "email" ? undefined : "_blank"}
          rel={i.key === "email" ? undefined : "noopener noreferrer"}
          className="text-link"
        >
          {i.label}
        </a>
      ))}
    </div>
  );
}

export default function PersonCard({
  person,
  featured = false,
}: {
  person: Member | Faculty;
  featured?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(person.photo);

  if (featured) {
    const f = person as Faculty;
    return (
      <article
        className="surface-card featured-person"
        style={{
          padding: "clamp(1.5rem, 3vw, 2.25rem)",
          display: "grid",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "260px",
            aspectRatio: "1",
            borderRadius: "4px",
            overflow: "hidden",
            background: "var(--substrate-hi)",
            border: "1px solid var(--hairline)",
          }}
        >
          <Image
            src={imgSrc}
            alt={f.name}
            fill
            style={{ objectFit: "cover", objectPosition: f.photoPosition }}
            sizes="(max-width: 768px) 100vw, 260px"
            onError={() => setImgSrc("/images/people/placeholder.svg")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              className="type-mono"
              style={{
                fontSize: "0.8125rem",
                color: "var(--accent)",
                letterSpacing: "0.04em",
              }}
            >
              {f.designation}
            </span>
            <h2
              className="type-display-md"
              style={{ margin: "0.25rem 0 0" }}
            >
              {f.name}
            </h2>
          </div>

          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "64ch",
            }}
          >
            {f.bio}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {f.researchDomains.map((d) => (
              <span key={d} className="chip">
                {d}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: "0.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--hairline)",
            }}
          >
            <PersonLinksList links={f.links} />
          </div>
        </div>
      </article>
    );
  }

  const m = person as Member;
  return (
    <article
      className="surface-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          borderRadius: "4px",
          overflow: "hidden",
          background: "var(--substrate-hi)",
        }}
      >
        <Image
          src={imgSrc}
          alt={m.name}
          fill
          style={{ objectFit: "cover", objectPosition: m.photoPosition }}
          sizes="(max-width: 640px) 50vw, 260px"
          onError={() => setImgSrc("/images/people/placeholder.svg")}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {m.name}
        </h3>
        <p className="type-mono" style={{ fontSize: "0.75rem", margin: 0 }}>
          {m.role}
        </p>
        {m.researchDomains.length > 0 && (
          <p
            className="type-mono"
            style={{
              fontSize: "0.6875rem",
              color: "var(--accent)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {m.researchDomains.join(" · ")}
          </p>
        )}
        <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
          <PersonLinksList links={m.links} />
        </div>
      </div>
    </article>
  );
}
