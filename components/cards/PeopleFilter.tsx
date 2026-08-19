"use client";

import { useState, useMemo } from "react";
import PersonCard from "@/components/cards/PersonCard";
import type { Member } from "@/lib/types";

interface PeopleFilterProps {
  members: Member[];
  allDegrees: string[];
  allDomains: string[];
}

const DEGREE_ORDER = ["PhD", "MS", "BTech/DD", "Research Assistant"];

/**
 * PeopleFilter — filter pads (degree / domain) routing the member grid.
 * Pads are the floorplan world's controls: flat, bordered, gold when active.
 */
export default function PeopleFilter({ members, allDegrees, allDomains }: PeopleFilterProps) {
  const [activeDegree, setActiveDegree] = useState<string>("All");
  const [activeDomain, setActiveDomain] = useState<string>("All");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const degreeMatch = activeDegree === "All" || m.degree === activeDegree;
      const domainMatch = activeDomain === "All" || m.researchDomains.includes(activeDomain);
      return degreeMatch && domainMatch;
    });
  }, [members, activeDegree, activeDomain]);

  const sortedDegrees = ["All", ...DEGREE_ORDER.filter((d) => allDegrees.includes(d))];
  const sortedDomains = ["All", ...allDomains];

  return (
    <div>
      {/* Filter pads */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
        <div>
          <p className="die-label" style={{ marginBottom: "0.75rem" }}>By degree</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {sortedDegrees.map((deg) => (
              <button
                key={deg}
                onClick={() => setActiveDegree(deg)}
                className={activeDegree === deg ? "pad pad-active" : "pad"}
                style={{ fontSize: "0.6875rem", cursor: "pointer", background: "var(--substrate)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                aria-pressed={activeDegree === deg}
              >
                {deg}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="die-label" style={{ marginBottom: "0.75rem" }}>By research domain</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {sortedDomains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={activeDomain === domain ? "pad pad-active" : "pad"}
                style={{ fontSize: "0.6875rem", cursor: "pointer", background: "var(--substrate)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                aria-pressed={activeDomain === domain}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          borderBottom: "1px solid var(--hairline)",
          paddingBottom: "0.875rem",
          marginBottom: "2rem",
        }}
      >
        <span className="type-mono" style={{ fontSize: "0.6875rem" }}>
          {filtered.length} OF {members.length} MEMBERS PLACED
        </span>
        {(activeDegree !== "All" || activeDomain !== "All") && (
          <button
            onClick={() => { setActiveDegree("All"); setActiveDomain("All"); }}
            className="pin-link"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.6875rem" }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Member grid */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "1.25rem" }}>
          {filtered.map((member) => (
            <PersonCard key={member.id} person={member} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 0", border: "1px dashed var(--hairline-strong)", borderRadius: "4px" }}>
          <p className="type-mono" style={{ margin: 0 }}>NO CELLS MATCH THIS ROUTING</p>
        </div>
      )}
    </div>
  );
}
