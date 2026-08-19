/**
 * ProjectCard — a placed cell on the research die.
 * No photography: cells carry the project's own content — code, title,
 * description, topics, routed links. Real project imagery can be added to
 * projects.json later; the cell reflows around it without a redesign.
 */
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const code = index ? String(index).padStart(2, "0") : project.slug.slice(0, 2).toUpperCase();

  const links = [
    { href: project.links.github,  label: "Code" },
    { href: project.links.paper,   label: "Paper" },
    { href: project.links.website, label: "Site" },
  ].filter((l) => l.href);

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid var(--hairline)",
        borderRadius: "4px",
        padding: "clamp(1.25rem, 2.5vw, 1.875rem)",
        background: "linear-gradient(180deg, rgba(127,179,213,0.05) 0%, rgba(16,19,25,0) 100%)",
        minHeight: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
        <span className="die-cell-code">{code}</span>
        <span className="type-mono" style={{ fontSize: "0.625rem" }}>
          {project.startYear} — {project.status.toUpperCase()}
        </span>
      </div>

      <h2 className="type-display-md" style={{ margin: 0 }}>{project.title}</h2>

      <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
        {project.fullDescription}
      </p>

      <ul style={{ listStyle: "none", margin: "0.25rem 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {project.topics.map((t) => (
          <li key={t} className="pad" style={{ fontSize: "0.625rem", padding: "0.3rem 0.625rem", cursor: "default" }}>
            {t}
          </li>
        ))}
      </ul>

      {links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid var(--hairline)" }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pin-link" style={{ fontSize: "0.6875rem" }}>
              <span className="via" aria-hidden />
              {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
