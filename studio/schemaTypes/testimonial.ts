import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial", title: "Testimonials", type: "document",
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", validation: (r) => r.required().max(80) }),
    defineField({ name: "jobTitle", title: "Current job title", type: "string", validation: (r) => r.required().max(100) }),
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required().max(100) }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "review", title: "Review", type: "text", rows: 5, validation: (r) => r.required().min(20).max(1000) }),
    defineField({ name: "rating", title: "Rating", type: "number", options: { list: [1, 2, 3, 4, 5] }, validation: (r) => r.required().integer().min(1).max(5) }),
    defineField({ name: "approved", title: "Approved for website", type: "boolean", initialValue: false, description: "Enable and publish to show this review on the portfolio." }),
    defineField({ name: "consentedAt", title: "Publishing consent recorded at", type: "datetime", readOnly: true }),
  ],
  preview: { select: { title: "name", company: "company", approved: "approved", media: "image" }, prepare({ title, company, approved, media }) { return { title, subtitle: `${approved ? "Approved" : "Pending review"} · ${company || ""}`, media }; } },
});
