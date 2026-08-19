/**
 * TypeScript type definitions for all data models.
 * These match the JSON files in /data and serve as
 * the single source of truth for data shapes.
 * Future contributors: update these types when you add fields to JSON.
 */

// ─── People ────────────────────────────────────────────────────────────────

export interface PersonLinks {
  email?: string;
  linkedin?: string;
  github?: string;
  googleScholar?: string;
  website?: string;
}

/** A lab member (non-faculty) */
export interface Member {
  id: string;
  name: string;
  photo: string;
  photoPosition: string; // CSS object-position value, e.g. "50% 40%"
  role: string;          // Display label: "PhD Student", "MS Student", etc.
  degree: string;        // Filter category: "PhD" | "MS" | "BTech/DD" | "Faculty"
  program?: string;      // e.g. "ECE", "ECD"
  yearJoined?: number;
  researchDomains: string[]; // e.g. ["In-Memory Computing", "RISC-V"]
  links: PersonLinks;
}

/** The faculty / lab head */
export interface Faculty {
  id: string;
  name: string;
  photo: string;
  photoPosition: string;
  role: "faculty";
  degree: "Faculty";
  designation: string;
  bio: string;
  researchDomains: string[];
  links: PersonLinks;
}

export interface PeopleData {
  faculty: Faculty[];
  members: Member[];
  alumni: Partial<Member>[];
}

// ─── Publications ──────────────────────────────────────────────────────────

export interface PublicationLinks {
  doi?: string;
  arxiv?: string;
  pdf?: string;
  code?: string;
  googleScholar?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  links: PublicationLinks;
  type: "journal" | "conference" | "preprint" | "workshop";
}

// ─── Projects ──────────────────────────────────────────────────────────────

export interface ProjectLinks {
  github?: string;
  website?: string;
  paper?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  topics: string[];
  links: ProjectLinks;
  status: "active" | "completed";
  startYear: number;
}

// ─── Blogs ─────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  date: string;   // ISO date string: "YYYY-MM-DD"
  description: string;
  link: string;   // External URL (IIIT blog)
  author: string;
  tags: string[];
  image: string;
}

// ─── Media & News ──────────────────────────────────────────────────────────

export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  date: string;
  event?: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  link: string;
  type: string;
  pinned?: boolean;
}

// ─── Lab ───────────────────────────────────────────────────────────────────

export interface Affiliation {
  name: string;
  logo: string;
  url: string;
}

export interface LabInfo {
  name: string;
  fullName: string;
  tagline: string;
  mission: string;
  logo: string;
  heroImages: string[];
  stats: {
    citations: number;
    hIndex: number;
    since: number;
  };
  contact: {
    email: string;
    address: string[];
    mapUrl: string;
  };
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    googleScholar?: string;
    youtube?: string;
  };
  affiliations: Affiliation[];
}
