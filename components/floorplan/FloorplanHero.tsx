/**
 * FloorplanHero — the homepage first viewport, drawn as a placed die.
 * No photography: the die is an authored floorplan schematic (construction
 * honesty). Real lab photos can later sit behind this overlay via
 * lab.json `heroImages` — swap path documented in data/lab.json.
 *
 * Composition (direction contract 0cf70ea1):
 *   die label top-left · six research blocks placed as regions with routed
 *   pins · pad ring along the bottom carrying lab stats · one primary action
 *   on the research pin.
 */
import Link from "next/link";
import { getProjects, getLabInfo, getPublications } from "@/lib/data";
import PinTrace from "@/components/floorplan/PinTrace";

export default function FloorplanHero() {
  const projects = getProjects().slice(0, 6);
  const lab = getLabInfo();
  const stats = lab.stats;
  const paperCount = getPublications().length;

  return (
    <section aria-label="SARCS research areas" className="hero-die">
      <div className="container">
        <div className="die mask-grid">
          {/* ── Die header: label block ───────────────────────────────────── */}
          <header className="die-head">
            <div>
              <p className="die-label">SUSTAINABLE · ADVANCED · ROBUST COMPUTING SYSTEMS</p>
              <h1 className="die-wordmark">SARCS</h1>
            </div>
            <div className="die-meta" aria-hidden>
              <span>CELL SARCS-CORE</span>
              <span>IIIT HYDERABAD</span>
              <span>EST {stats.since}</span>
            </div>
          </header>

          {/* ── Placed research blocks ────────────────────────────────────── */}
          <div className="die-blocks">
            {projects.map((project, idx) => (
              <Link
                key={project.id}
                href="/research"
                className="die-block group"
                aria-label={`${project.title} — ${project.shortDescription}`}
              >
                <div className="die-block-head">
                  <span className="die-cell-code">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="die-cell-name">{project.title.toUpperCase()}</span>
                </div>
                <p className="die-block-desc">{project.shortDescription}</p>
                <ul className="die-block-topics">
                  {project.topics.slice(0, 2).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <PinTrace variant="block" />
              </Link>
            ))}
          </div>

          {/* ── Pad ring: lab stats + primary action ──────────────────────── */}
          <footer className="die-padring">
            <div className="die-stats">
              <div className="stat-pad">
                <span className="stat-value tnum">{paperCount}</span>
                <span className="stat-unit">Publications</span>
              </div>
              <div className="stat-pad">
                <span className="stat-value tnum">{stats.citations}</span>
                <span className="stat-unit">Citations</span>
              </div>
              <div className="stat-pad">
                <span className="stat-value tnum">{stats.hIndex}</span>
                <span className="stat-unit">H-index</span>
              </div>
              <div className="stat-pad">
                <span className="stat-value tnum">{stats.since}</span>
                <span className="stat-unit">Established</span>
              </div>
            </div>

            <Link href="/research" className="pin-link hero-action">
              <span className="via" aria-hidden />
              Explore research
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
}
