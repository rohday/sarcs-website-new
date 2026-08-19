/**
 * PersonCard — a member cell on the people die.
 * Featured mode (PI): two-column die region with real photo, bio, domains.
 * Standard member: photo cell + name + role + domains + contact pads.
 */
import Image from "next/image";
import type { Member, Faculty, PersonLinks } from "@/lib/types";

const iconLinks = [
  { key: "email",         label: "Email",   href: (v: string) => `mailto:${v}` },
  { key: "googleScholar", label: "Scholar", href: (v: string) => v },
  { key: "github",        label: "GitHub",  href: (v: string) => v },
  { key: "linkedin",      label: "LinkedIn", href: (v: string) => v },
] as const;

function PersonPads({ links }: { links: PersonLinks }) {
  const visible = iconLinks.filter((i) => links[i.key]);
  if (visible.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {visible.map((i) => (
        <a
          key={i.key}
          href={i.href(links[i.key]!)}
          target={i.key === "email" ? undefined : "_blank"}
          rel={i.key === "email" ? undefined : "noopener noreferrer"}
          className="pad"
          style={{ fontSize: "0.625rem", textDecoration: "none" }}
        >
          {i.label}
        </a>
      ))}
    </div>
  );
}

export default function PersonCard({ person, featured = false }: { person: Member | Faculty; featured?: boolean }) {
  if (featured) {
    const f = person as Faculty;
    return (
      <article
        style={{
          border: "1px solid var(--hairline)",
          borderRadius: "4px",
          padding: "clamp(1.25rem, 2.5vw, 2rem)",
          background: "linear-gradient(180deg, rgba(201,163,92,0.06) 0%, rgba(16,19,25,0) 100%)",
        }}
        className="featured-person"
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "3px", overflow: "hidden", background: "var(--substrate-hi)", border: "1px solid var(--hairline)" }}>
          <Image src={f.photo} alt={f.name} fill style={{ objectFit: "cover", objectPosition: f.photoPosition }} sizes="300px" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className="die-label" style={{ margin: 0 }}>{f.designation}</p>
          <h2 className="type-display-md" style={{ margin: 0 }}>{f.name}</h2>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0, maxWidth: "62ch" }}>
            {f.bio}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {f.researchDomains.map((d) => (
              <span key={d} className="pad" style={{ fontSize: "0.625rem", cursor: "default" }}>{d}</span>
            ))}
          </div>
          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--hairline)" }}>
            <PersonPads links={f.links} />
          </div>
        </div>
      </article>
    );
  }

  const m = person as Member;
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        border: "1px solid var(--hairline)",
        borderRadius: "4px",
        padding: "0.875rem",
        background: "var(--substrate)",
        transition: "border-color 0.2s ease",
      }}
      className="person-cell"
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "3px", overflow: "hidden", background: "var(--substrate-hi)" }}>
        <Image src={m.photo} alt={m.name} fill style={{ objectFit: "cover", objectPosition: m.photoPosition }} sizes="(max-width: 640px) 50vw, 25vw" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--oxide)", margin: 0, letterSpacing: "-0.005em" }}>
          {m.name}
        </h3>
        <p className="type-mono" style={{ fontSize: "0.625rem", margin: 0 }}>{m.role}</p>
        {m.researchDomains.length > 0 && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.03em", color: "var(--metal)", margin: 0, lineHeight: 1.5 }}>
            {m.researchDomains.join(" · ")}
          </p>
        )}
        <div style={{ marginTop: "0.375rem" }}>
          <PersonPads links={m.links} />
        </div>
      </div>
    </article>
  );
}
