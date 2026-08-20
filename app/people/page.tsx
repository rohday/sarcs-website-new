import type { Metadata } from "next";
import {
  getPeople,
  getLabInfo,
  getAllDegrees,
  getAllResearchDomains,
} from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import PersonCard from "@/components/cards/PersonCard";
import PeopleFilter from "@/components/cards/PeopleFilter";

export const metadata: Metadata = {
  title: "People",
  description:
    "Meet the team at SARCS Lab — faculty, PhD students, MS students, and undergraduate researchers working on next-generation computing systems.",
};

export default function PeoplePage() {
  const { faculty, members } = getPeople();
  const labInfo = getLabInfo();
  const allDegrees = getAllDegrees();
  const allDomains = getAllResearchDomains();
  const labHead = faculty[0];

  return (
    <div>
      <PageHeader
        title="People"
        description="Researchers, engineers, and students advancing hardware-software co-design at IIIT Hyderabad."
      />

      {labHead && (
        <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <h2
            className="type-display-md"
            style={{ margin: "0 0 1.5rem" }}
          >
            Principal Investigator
          </h2>
          <PersonCard person={labHead} featured />
        </Section>
      )}

      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <h2
          className="type-display-md"
          style={{ margin: "0 0 1.5rem" }}
        >
          Lab Members
        </h2>
        <PeopleFilter
          members={members}
          allDegrees={allDegrees}
          allDomains={allDomains}
        />
      </Section>

      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <h2 className="type-display-md" style={{ margin: "0 0 1.5rem" }}>
          Contact &amp; Inquiries
        </h2>

        <div
          className="contact-grid surface-card"
          style={{
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <div>
            <h3
              className="type-mono"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: "0 0 0.875rem",
              }}
            >
              Laboratory Address
            </h3>
            <address
              style={{
                fontStyle: "normal",
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: "0 0 1.5rem",
              }}
            >
              {labInfo.contact.address.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </address>
            <a
              href={`mailto:${labInfo.contact.email}`}
              className="text-link"
            >
              {labInfo.contact.email}
            </a>
          </div>

          <div>
            <h3
              className="type-mono"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: "0 0 0.875rem",
              }}
            >
              Campus Location
            </h3>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: "0 0 1.5rem",
              }}
            >
              {labInfo.contact.address[0]}
              <br />
              Center for VLSI and Embedded Systems Technology (CVEST)
              <br />
              IIIT Hyderabad Campus
            </p>
            <a
              href={labInfo.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
