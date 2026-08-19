# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Prospective graduate students** (PhD/MS applicants, primarily from India but open globally): deciding whether SARCS is worth applying to — they scan research areas, people, publications, openings, and how to contact the PI.
- **Undergraduate researchers at IIIT Hyderabad** (BTech/DD): looking for research projects and mentoring.
- **Industry partners and funders** (Google, Qualcomm, DST, semiconductor startups): assessing research capability, prior work, and collaboration credibility.
- **Peer researchers**: checking publications, lab activity, academic rigor. The site must showcase research as its core proof, not just recruit.

## Product Purpose

Official website for the Sustainable, Advanced and Robust Computing Systems (SARCS) Laboratory at IIIT Hyderabad. It exists to make the lab's research visible and credible: attract strong students, support industry/funding conversations, and serve as the canonical public record of people, publications, and lab news. Success = a visitor can grasp the lab's research identity in under a minute, find specific publications or people fast, and reach the PI.

## Positioning

A young, high-output systems lab with serious research credentials in emerging computing: compute-in-memory, probabilistic/Bayesian hardware, RISC-V, quantum, and edge AI. Published in Nature Communications, TCAS-I, TVLSI, DATE, MobiSys, ICASSP — led by PI Priyesh Shukla (PhD UIC). Housed in CVEST at IIIT Hyderabad.

## Operating Context

- Static, serverless deployment on the domain sarcslab.org (inherited from GitHub Pages static export workflow).
- No CMS; all content lives in versioned JSON files under /data and is validated before every build.
- Content is edited by lab members, not professional web developers — update flows must stay JSON-edit simple, with check scripts catching breakage.
- Visitors arrive mostly from conference pages, Scholar, LinkedIn, or direct search for the PI/lab name.

## Capabilities and Constraints

- Stack: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, static export (`output: "export"`, unoptimized images, `trailingSlash: true`).
- Data layer: `data/*.json` (people, projects, publications, blogs, lab) consumed by `lib/data.ts`; `scripts/check-data.mjs` validates data + image paths (runs via `npm run check` and as `prebuild`).
- Pages required: Home, Research, Publications, People, Media. (Blog/news content exists in data and may appear on Home or under Media.)
- The codebase must remain modular: components split by concern; adding a member/paper/project must be a JSON edit, never a code change.
- **No logo exists yet.** The SARCS wordmark/name is the identity until a logo asset arrives. Placeholder handling must not hardcode a logo path as required.
- Undecided: whether an Openings/join-us section ships now (recruiting matters, but no decision recorded yet — treat as open).

## Brand Commitments

- Name: SARCS — "Sustainable, Advanced and Robust Computing Systems Laboratory", IIIT Hyderabad.
- Domain: sarcslab.org.
- PI identity: Priyesh Shukla, Assistant Professor. Contact priyesh.shukla@iiit.ac.in.
- No visual identity is binding yet: no logo, no pinned palette, no pinned typography.

## Evidence on Hand

- `data/publications.json` — 9 real publications (incl. Nature Communications 2024, TCAS-I 2022, MobiSys 2026, arXiv preprints 2026).
- `data/people.json` — PI + 7 members (1 PhD, 2 MS, 4 UG researchers), all joined 2025.
- `data/projects.json` — 6 active research areas (IMC, RISC-V, Accelerators, Quantum, Edge AI, Photonics).
- Photos: lab team lunch, RnD showcase, ICEDGE 2025 award (with awardee), hardware/hero images, gallery originals under `public/images/gallery/Original HD/`.
- Google Scholar profile (246 citations, h-index 8), GitHub org SARCS-Research-Group-IIITH, LinkedIn, YouTube.
- Absences that future work must NOT fabricate: alumni list is empty; no press articles beyond the ICEDGE acceptance; no funding amounts; no logo asset.

## Product Principles

1. Research is the proof — publications, systems, and real outcomes lead; recruitment follows from credibility, not hype.
2. Content edits are JSON-only — anyone in the lab can update people, papers, and news without touching code.
3. Modularity is a feature — pages/components are composable pieces, so new sections or pages don't require rewrites.
4. Honest and current — no invented testimonials, benchmarks, or alumni; empty sections are hidden, not padded.
5. Fast and static — everything prerenders; no runtime dependencies; works on slow academic networks.

## Accessibility & Inclusion

- Standard web accessibility: keyboard navigation, sufficient contrast, reduced-motion respect, semantic HTML. No product-specific accommodations established yet.
