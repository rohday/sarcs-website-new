/**
 * Data sanity checker — run with:  npm run check
 *
 * Reads every JSON file in /data and reports anything that will break the site,
 * with plain-English hints on how to fix it. Also verifies that every image path
 * actually exists in /public so you never ship a broken image.
 *
 * Run it after editing anything in /data. It also runs automatically before
 * `npm run build` (see the "prebuild" script in package.json).
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function load(name) {
  try {
    return JSON.parse(readFileSync(join(root, "data", name), "utf8"));
  } catch (err) {
    fail(`data/${name} could not be read as JSON: ${err.message}`);
    return null;
  }
}

/** A required field is missing, null, or empty string. */
function requireFields(obj, label, fields) {
  if (!obj || typeof obj !== "object") {
    fail(`${label} is not an object`);
    return;
  }
  const missing = fields.filter(
    (f) => obj[f] === undefined || obj[f] === null || obj[f] === ""
  );
  if (missing.length) {
    fail(`${label} is missing: ${missing.join(", ")}`);
  }
}

function isNonEmptyArray(v) {
  return Array.isArray(v) && v.length > 0;
}

/** Any image path starting with "/" must point to a real file in /public. */
function checkImage(path, label) {
  if (typeof path !== "string") return;
  if (!path.startsWith("/")) {
    fail(`${label} image path should start with "/" — got "${path}"`);
    return;
  }
  if (!existsSync(join(root, "public", path))) {
    fail(`${label} image not found in public folder: "${path}"`);
  }
}

function checkDuplicateIds(items, fileLabel) {
  const seen = new Set();
  items.forEach((item) => {
    if (seen.has(item.id)) fail(`${fileLabel} has a duplicate id: "${item.id}"`);
    seen.add(item.id);
  });
}

/* ─── people.json ──────────────────────────────────────────────────────────── */
const people = load("people.json");
if (people) {
  const faculty = people.faculty || [];
  const members = people.members || [];

  faculty.forEach((f, i) => {
    const label = `people.json → faculty[${i}] (${f.name || "no name"})`;
    requireFields(f, label, ["id", "name", "photo", "photoPosition", "role", "degree", "designation", "bio", "researchDomains", "links"]);
    if (!isNonEmptyArray(f.researchDomains)) fail(`${label} needs researchDomains — a non-empty list of topics`);
    checkImage(f.photo, label);
  });

  members.forEach((m, i) => {
    const label = `people.json → members[${i}] (${m.name || "no name"})`;
    requireFields(m, label, ["id", "name", "photo", "photoPosition", "role", "degree", "researchDomains", "links"]);
    if (!isNonEmptyArray(m.researchDomains)) fail(`${label} needs researchDomains — a non-empty list of topics`);
    checkImage(m.photo, label);
    if (!m.links?.email && !m.links?.linkedin && !m.links?.github) {
      warn(`${label} has no contact links — add at least an email`);
    }
    const knownDegrees = ["PhD", "MS", "BTech/DD", "Research Assistant", "Faculty"];
    if (m.degree && !knownDegrees.includes(m.degree)) {
      warn(`${label} uses degree "${m.degree}" — if you want it to show as a filter tab, add it to the DEGREE_ORDER list in components/cards/PeopleFilter.tsx`);
    }
  });

  checkDuplicateIds([...faculty, ...members], "people.json");
}

/* ─── projects.json ────────────────────────────────────────────────────────── */
const projects = load("projects.json");
if (projects) {
  projects.forEach((p, i) => {
    const label = `projects.json[${i}] (${p.title || "no title"})`;
    requireFields(p, label, ["id", "slug", "title", "shortDescription", "fullDescription", "image", "topics", "links", "status", "startYear"]);
    if (p.status && !["active", "completed"].includes(p.status)) {
      fail(`${label} has status "${p.status}" — use "active" or "completed"`);
    }
    if (typeof p.startYear !== "number") fail(`${label} startYear must be a year number`);
    if (!isNonEmptyArray(p.topics)) fail(`${label} needs topics — a non-empty list`);
    checkImage(p.image, label);
  });
  checkDuplicateIds(projects, "projects.json");
}

/* ─── publications.json ────────────────────────────────────────────────────── */
const pubs = load("publications.json");
if (pubs) {
  pubs.forEach((p, i) => {
    const label = `publications.json[${i}] (${p.title || "no title"})`;
    requireFields(p, label, ["id", "title", "authors", "venue", "year", "abstract", "tags", "links", "type"]);
    if (!isNonEmptyArray(p.authors)) fail(`${label} needs authors — a non-empty list`);
    if (typeof p.year !== "number") fail(`${label} year must be a number`);
    if (p.type && !["journal", "conference", "preprint", "workshop"].includes(p.type)) {
      fail(`${label} has type "${p.type}" — use journal, conference, preprint or workshop`);
    }
    const hasLink = p.links && Object.values(p.links).some(Boolean);
    if (!hasLink) warn(`${label} has no links (doi/arxiv/pdf/code) — readers can't open it`);
  });
  checkDuplicateIds(pubs, "publications.json");
}

/* ─── blogs.json ───────────────────────────────────────────────────────────── */
const blogs = load("blogs.json");
if (blogs) {
  blogs.forEach((b, i) => {
    const label = `blogs.json[${i}] (${b.title || "no title"})`;
    requireFields(b, label, ["id", "title", "date", "description", "link", "author", "tags", "image"]);
    if (b.date && !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
      fail(`${label} has date "${b.date}" — use YYYY-MM-DD`);
    }
    if (b.link && !/^https?:\/\//.test(b.link)) {
      warn(`${label} link "${b.link}" doesn't start with http:// or https://`);
    }
    checkImage(b.image, label);
  });
  checkDuplicateIds(blogs, "blogs.json");
}

/* ─── lab.json ─────────────────────────────────────────────────────────────── */
const lab = load("lab.json");
if (lab) {
  requireFields(lab, "lab.json", ["name", "fullName", "tagline", "mission", "logo", "heroImages", "contact", "socialLinks", "affiliations"]);
  requireFields(lab.contact, "lab.json → contact", ["email", "address", "mapUrl"]);
  if (lab.logo) checkImage(lab.logo, "lab.json logo");
  if (!isNonEmptyArray(lab.heroImages)) {
    fail("lab.json → heroImages needs a non-empty list of image paths for the homepage hero");
  } else {
    lab.heroImages.forEach((image, i) => checkImage(image, `lab.json → heroImages[${i}]`));
  }
  lab.affiliations?.forEach((a, i) => {
    const label = `lab.json → affiliations[${i}] (${a.name || "no name"})`;
    requireFields(a, label, ["name", "logo", "url"]);
    checkImage(a.logo, label);
  });
}

/* ─── Report ───────────────────────────────────────────────────────────────── */
const counts = {
  people: people ? `${(people.faculty || []).length} faculty, ${(people.members || []).length} members` : "unreadable",
  projects: projects ? `${projects.length} projects` : "unreadable",
  publications: pubs ? `${pubs.length} publications` : "unreadable",
  blogs: blogs ? `${blogs.length} blog posts` : "unreadable",
};

console.log(
  `Checking data… (${counts.people} · ${counts.projects} · ${counts.publications} · ${counts.blogs})\n`
);

if (warnings.length) {
  console.log(`  ${warnings.length} minor note(s):`);
  warnings.forEach((w) => console.log(`    · ${w}`));
  console.log("");
}

if (errors.length === 0) {
  console.log("  ✓ All good — nothing to fix.\n");
} else {
  console.log(`  ✗ ${errors.length} problem(s) found:\n`);
  errors.forEach((e) => console.log(`    ✗ ${e}`));
  console.log(
    `\n  Fix the lines above, then run "npm run check" again. See data/README.md for how each file works.\n`
  );
  process.exit(1);
}
