export type ProjectImage = { url: string; alt: string; caption?: string };
export type Project = {
  title: string; slug: string; summary: string; tags: string[];
  cover: ProjectImage; images: ProjectImage[]; description: string;
  about?: PortableTextBlock[];
  sections?: { heading: string; body?: string; richBody?: PortableTextBlock[] }[];
  liveUrl?: string; sourceUrl?: string;
};
// Existing content is used until the first project is published in Sanity.
export const initialProjects: Project[] = [
  {
    title: "Converso SaaS App", slug: "converso", tags: ["AI", "Voice"],
    summary: "An AI teaching platform for learning through real-time voice conversations with subject-specific companions.",
    cover: { url: "/Images/Converso.png", alt: "Converso learning companion dashboard" }, images: [],
    description: "Converso is a real-time AI teaching platform built around conversations. Learners can browse learning companions or create a tutor for a specific subject and topic.\n\nDuring a voice session, a live transcript lets learners follow the conversation as it happens. Signing in allows them to keep track of their companions and completed sessions.",
  },
  {
    title: "MovieFlix", slug: "movieflix", tags: ["Next.js"],
    summary: "A movie discovery experience with category browsing, clip previews, trailers, and dedicated movie pages.",
    cover: { url: "/Images/Movieflix.png", alt: "MovieFlix movie browsing interface" }, images: [],
    description: "MovieFlix is a movie-browsing web app built with Next.js. Visitors can explore movies by category and preview available clips directly from movie cards.\n\nEach movie has a dedicated page with its trailer and details, making it easy to move from browsing to a closer look at a title.",
  },
  {
    title: "Note App", slug: "note-app", tags: ["React", "Vite", "Express", "MongoDB", "Node.js"],
    summary: "A full-stack workspace for creating, browsing, editing, and deleting notes in a responsive interface.",
    cover: { url: "/Images/Note app MERN.png", alt: "Note App notes interface" }, images: [],
    description: "NoteApp is a full-stack note-taking application with a React and Vite frontend and an Express, MongoDB, and Node.js backend.\n\nThe application supports creating, browsing, editing, and deleting notes through a responsive interface. The frontend provides the workspace, while the backend handles storing and updating note data.",
  },
];
export function safeProjectUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : undefined; }
  catch { return undefined; }
}
import type { PortableTextBlock } from "@portabletext/types";

