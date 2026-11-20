import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/sanity/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const pagePaths = ["/", "/work", "/services", "/resume", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const projectPaths = projects.map(({ slug }) => `/projects/${encodeURIComponent(slug)}`);

  return [...pagePaths, ...projectPaths].map((path) => ({ url: `${siteUrl}${path}` }));
}
