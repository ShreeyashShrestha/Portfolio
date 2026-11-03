import "server-only";
import { createClient } from "@sanity/client";

export function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) return null;
  return createClient({
    projectId,
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: "2026-03-01",
    token,
    useCdn: false,
    perspective: "published",
  });
}
