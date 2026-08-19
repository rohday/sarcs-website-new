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

export default function PeopleFilter({
  members,
  allDegrees,
  allDomains,
}: PeopleFilterProps) {
  const [activeDegree, setActiveDegree] = useState<string>("All");
  const [activeDomain, setActiveDomain] = useState<string>("All");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const degreeMatch = activeDegree === "All" || m.degree === activeDegree;
      const domainMatch =
        activeDomain === "All" || m.researchDomains.includes(activeDomain);
      return degreeMatch && domainMatch;
    });
  }, [members, activeDegree, activeDomain]);

  const sortedDegrees = [
    "All",
    ...DEGREE_ORDER.filter((d) => allDegrees.includes(d)),
  ];
  const sortedDomains = ["All", ...allDomains];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <h2
            className="type-mono"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "0 0 0.75rem",
            }}
          >
            Filter by degree
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {sortedDegrees.map((deg) => (
              <button
                key={deg}
                onClick={() => setActiveDegree(deg)}
                className={activeDegree === deg ? "chip chip-active" : "chip"}
                style={{ cursor: "pointer" }}
                aria-pressed={activeDegree === deg}
              >
                {deg}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2
            className="type-mono"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "0 0 0.75rem",
            }}
          >
            Filter by research area
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {sortedDomains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={
                  activeDomain === domain ? "chip chip-active" : "chip"
                }
                style={{ cursor: "pointer" }}
                aria-pressed={activeDomain === domain}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

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
        <span className="type-mono" style={{ fontSize: "0.75rem" }}>
          Showing {filtered.length} of {members.length} members
        </span>
        {(activeDegree !== "All" || activeDomain !== "All") && (
          <button
            onClick={() => {
              setActiveDegree("All");
              setActiveDomain("All");
            }}
            className="text-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 230px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((member) => (
            <PersonCard key={member.id} person={member} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            border: "1px dashed var(--hairline-strong)",
            borderRadius: "4px",
          }}
        >
          <p className="type-mono" style={{ margin: 0 }}>
            No members match this filter
          </p>
        </div>
      )}
    </div>
  );
}
