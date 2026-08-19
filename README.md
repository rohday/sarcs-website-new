# SARCS Lab Website

Official website of the **Sustainable, Advanced and Robust Computing Systems (SARCS) Laboratory**
at IIIT Hyderabad.

Built with Next.js 14 (App Router), React 18, TypeScript and Tailwind. Exported as a
static site for GitHub Pages.

## Quick start

```bash
npm install
npm run dev       # local dev server at http://localhost:3000
npm run check     # validates all content in /data (runs before every build too)
npm run build     # production build + static export to /out
```

## Updating content

All site content — people, blog posts, publications, projects, affiliations and
contact info — lives in the JSON files in [`data/`](data). No code changes needed.

**Read [`data/README.md`](data/README.md) first** — it explains each file and how
to add a person, post, paper or project in plain English. After any edit run
`npm run check` to catch mistakes before they go live.

## Project structure

```
app/                 pages & global styles (Next.js App Router)
components/
  layout/            site chrome — Navbar, Footer, Preloader
  canvas/            animated backgrounds — dot matrix, ASCII birds
  cards/             content renderers — Project/Person/Blog/Publication/Affiliation cards
  ui/                shared primitives — Section, SectionHeader, PageHeader, EditorialLink
data/                all editable content (JSON) + content guide (README.md)
lib/                 types + data access helpers (read the JSON, nothing to edit here)
public/images/       photos and logos (drop new images here)
scripts/             check-data.mjs — the content validator behind `npm run check`
```

## Deployment

Static export (see `next.config.mjs`). Build produces a `static`/`out` folder ready
for GitHub Pages — set `basePath` in `next.config.mjs` if deploying under a repo name.
