/**
 * People page — the roster die.
 * PI featured as the primary die region; members placed as cells with
 * degree/domain filter pads; contact cell closes the page.
 */
import type { Metadata } from "next";
import { getPeople, getLabInfo, getAllDegrees, getAllResearchDomains } from "@/lib/data";
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
        dieLabel="Roster · placed cells"
        title="People"
        description="Researchers, engineers, and students advancing hardware-software co-design at IIIT Hyderabad."
      />

      {/* Principal investigator */}
      {labHead && (
        <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <p className="die-label" style={{ marginBottom: "1.25rem" }}>Principal investigator</p>
          <PersonCard person={labHead} featured />
        </Section>
      )}

      {/* Lab members */}
      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <p className="die-label" style={{ marginBottom: "1.25rem" }}>Lab members</p>
        <PeopleFilter members={members} allDegrees={allDegrees} allDomains={allDomains} />
      </Section>

      {/* Contact cell */}
      <Section style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <p className="die-label" style={{ marginBottom: "1.25rem" }}>Location &amp; inquiries</p>
        <h2 className="type-display-md" style={{ margin: "0 0 2rem" }}>Contact</h2>

        <div
          className="contact-grid"
          style={{ border: "1px solid var(--hairline)", borderRadius: "4px", padding: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          <div>
            <p className="die-label" style={{ marginBottom: "0.875rem" }}>Laboratory address</p>
            <address style={{ fontStyle: "normal", fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
              {labInfo.contact.address.map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </address>
            <a href={`mailto:${labInfo.contact.email}`} className="pin-link">
              <span className="via" aria-hidden />
              {labInfo.contact.email}
            </a>
          </div>

          <div>
            <p className="die-label" style={{ marginBottom: "0.875rem" }}>Campus cell</p>
            <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
              {labInfo.contact.address[0]}
              <br />
              Center for VLSI and Embedded Systems Technology (CVEST)<br />
              IIIT Hyderabad Campus
            </p>
            <a href={labInfo.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="pin-link">
              <span className="via" aria-hidden />
              Open in Google Maps
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
