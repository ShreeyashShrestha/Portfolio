import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio Testimonials",
  projectId: "f8x4ga2e",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
