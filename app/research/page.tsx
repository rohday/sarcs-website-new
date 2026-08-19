import type { Metadata } from "next";
import { getActiveProjects } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/cards/ProjectCard";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research projects at SARCS Lab — in-memory computing, RISC-V architectures, hardware accelerators, quantum computing, edge AI, and photonics.",
};

export default function ResearchPage() {
  const projects = getActiveProjects();

  return (
    <div>
      <PageHeader
        title="Research Areas"
        description="Work spans transistor-level memory primitives, open-source processor microarchitectures, and quantum machine learning frameworks."
      />

      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
