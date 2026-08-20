/**
 * Data access helpers.
 * These functions read the JSON data files and return typed objects.
 * All functions are synchronous — data is loaded at build time (server components).
 *
 * To update content: edit the JSON files in /data, not this file.
 */

import peopleData from "@/data/people.json";
import publicationsData from "@/data/publications.json";
import projectsData from "@/data/projects.json";
import blogsData from "@/data/blogs.json";
import labData from "@/data/lab.json";
import mediaData from "@/data/media.json";
import newsData from "@/data/news.json";

import type {
  PeopleData,
  Publication,
  Project,
  BlogPost,
  LabInfo,
  Affiliation,
  MediaItem,
  NewsItem,
} from "./types";

/** Returns the full people dataset (faculty + members + alumni) */
export function getPeople(): PeopleData {
  return peopleData as PeopleData;
}

/** Returns publications sorted newest-first by year */
export function getPublications(): Publication[] {
  return (publicationsData as Publication[]).sort((a, b) => b.year - a.year);
}

/** Returns all research projects */
export function getProjects(): Project[] {
  return projectsData as Project[];
}

/** Returns only projects with status "active" */
export function getActiveProjects(): Project[] {
  return getProjects().filter((p) => p.status === "active");
}

/** Returns blog posts sorted newest-first */
export function getBlogs(): BlogPost[] {
  return (blogsData as BlogPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns lab metadata and contact info */
export function getLabInfo(): LabInfo {
  return labData as LabInfo;
}

/** Returns the list of institutional / industry affiliations (from lab.json) */
export function getAffiliations(): Affiliation[] {
  return labData.affiliations as Affiliation[];
}

/** Derives all unique research domains across all members (for filtering) */
export function getAllResearchDomains(): string[] {
  const { members } = getPeople();
  const domainsSet = new Set<string>();
  members.forEach((m) => m.researchDomains.forEach((d) => domainsSet.add(d)));
  return Array.from(domainsSet).sort();
}

/** Derives all unique degree categories (for filtering) */
export function getAllDegrees(): string[] {
  const { members } = getPeople();
  const degreesSet = new Set<string>();
  members.forEach((m) => degreesSet.add(m.degree));
  return Array.from(degreesSet);
}

/** Returns media gallery items, newest-first */
export function getMedia(): MediaItem[] {
  return (mediaData as MediaItem[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns news items, newest-first */
export function getNews(): NewsItem[] {
  return (newsData as NewsItem[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns count of distinct publication venues */
export function getDistinctVenueCount(): number {
  const pubs = getPublications();
  const venues = new Set(pubs.map((p) => p.venue).filter(Boolean));
  return venues.size;
}

/** Extracts clean short venue acronym with year (e.g. "VTS 2025", "DATE 2024", "arXiv 2026") */
export function getPublicationVenueLabel(pub: Publication): string {
  const v = pub.venue || "";
  const matchParen = v.match(/\(([A-Za-z0-9\- ]+)\)/);
  if (matchParen && matchParen[1]) {
    const acronym = matchParen[1].trim();
    if (acronym.length <= 10) return `${acronym} ${pub.year}`;
  }
  if (v.toLowerCase().includes("arxiv")) return `arXiv ${pub.year}`;
  if (v.toLowerCase().includes("vlsi systems") || v.toLowerCase().includes("tvlsi")) return `TVLSI ${pub.year}`;
  if (v.toLowerCase().includes("tcas")) return `TCAS-I ${pub.year}`;
  return `${pub.year}`;
}


