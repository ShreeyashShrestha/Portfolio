import { defineArrayMember, defineField, defineType } from "sanity";
const richTextBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "Normal", value: "normal" }, { title: "Heading", value: "h3" }],
  lists: [{ title: "Bullet list", value: "bullet" }, { title: "Numbered list", value: "number" }],
  marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }], annotations: [] },
});
const imageFields = [
  defineField({ name: "alt", title: "Image description", type: "string", validation: r => r.required(), description: "Describe this screenshot for visitors using a screen reader." }),
  defineField({ name: "caption", title: "Caption", type: "string" }),
];
export default defineType({
  name: "project", title: "Projects", type: "document",
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "Page URL", type: "slug", options: { source: "title", maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: "summary", title: "Short description", type: "text", rows: 3, validation: r => r.required().max(300) }),
    defineField({ name: "cover", title: "Cover image", type: "image", options: { hotspot: true }, fields: imageFields, validation: r => r.required() }),
    defineField({ name: "images", title: "Screenshot gallery", description: "Drag to reorder. If empty, the cover image is shown on the detail page.", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: imageFields })] }),
    defineField({ name: "tags", title: "Tech stack", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, validation: r => r.required().min(1).unique() }),
    defineField({
      name: "about", title: "About the project", type: "array",
      description: "Write the full story. Select text and use the toolbar to create bullet or numbered lists.",
      of: [richTextBlock],
      validation: r => r.custom((value, context) => value?.length || context.document?.description ? true : "Write an about description."),
    }),
    defineField({
      name: "description", title: "Previous description (plain text)", type: "text", rows: 8,
      description: "Your existing description is preserved here. Copy it into About the project above to add formatting. The website uses the formatted version when present.",
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: "sections", title: "Additional story sections",
      description: "For example: Features, My role, Challenges, or What I learned.",
      type: "array", of: [defineArrayMember({
        name: "storySection", type: "object",
        fields: [
          defineField({ name: "heading", type: "string", validation: r => r.required() }),
          defineField({
            name: "richBody", title: "Body", type: "array", of: [richTextBlock],
            description: "Use the toolbar to add bullet or numbered lists, bold text, and headings.",
            validation: r => r.custom((value, context) => {
              const previous = (context.parent as { body?: string } | undefined)?.body;
              return value?.length || previous?.trim() ? true : "Write a section body.";
            }),
          }),
          defineField({
            name: "body", title: "Previous body (plain text)", type: "text", rows: 8,
            description: "Your existing text is preserved. Copy it into Body above to add formatting. The website uses the formatted version when present.",
            hidden: ({ value }) => !value,
          }),
        ],
        preview: { select: { title: "heading" } },
      })],
    }),
    defineField({ name: "liveUrl", title: "Live demo URL", type: "url", validation: r => r.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "sourceUrl", title: "Source code URL", type: "url", validation: r => r.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "order", title: "Display order", description: "Lower numbers appear first.", type: "number", initialValue: 0, validation: r => r.integer().min(0) }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "cover" } },
});
