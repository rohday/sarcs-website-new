import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const links = [
    { href: project.links.github, label: "Code" },
    { href: project.links.paper, label: "Paper" },
    { href: project.links.website, label: "Site" },
  ].filter((l) => l.href);

  return (
    <article
      className="surface-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span className="type-mono" style={{ fontSize: "0.75rem" }}>
          {project.startYear} · {project.status}
        </span>
      </div>

      <h2 className="type-display-md" style={{ margin: 0 }}>
        {project.title}
      </h2>

      <p
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
          margin: 0,
        }}
      >
        {project.fullDescription}
      </p>

      <ul
        style={{
          listStyle: "none",
          margin: "0.25rem 0 0",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {project.topics.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>

      {links.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--hairline)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
