import "server-only";
import { cache } from "react";
import { getSanityClient } from "./server";
import { initialProjects, type Project } from "../projects";
export const getProjects = cache(async (): Promise<Project[]> => {
  const client = getSanityClient();
  if (!client) return initialProjects;
  try {
    const projects = await client.fetch<Project[]>(`*[_type == "project" && defined(slug.current) && defined(cover.asset)] | order(coalesce(order, 999) asc, _createdAt desc) {
    title, "slug": slug.current, summary, "tags": coalesce(tags, []), description, about, sections, liveUrl, sourceUrl,
    "cover": {"url": cover.asset->url, "alt": coalesce(cover.alt, title)},
    "images": coalesce(images[]{"url": asset->url, "alt": coalesce(alt, ^.title), caption}[defined(url)], [])
  }`, {}, { cache: "no-store", timeout: 10000 });
    return projects.length ? projects : initialProjects;
  } catch {
    console.warn("Projects could not be loaded from Sanity; showing the local project collection.");
    return initialProjects;
  }
});
