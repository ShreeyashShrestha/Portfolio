This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Managing projects

The homepage and `/work` use the same project slider. Cards open `/projects/<slug>` with a screenshot gallery and full project story.

Run the existing Studio with `npm --prefix studio run dev`, sign in to Sanity, and open **Projects**. Add a title, generate the slug, upload a cover, enter a short description and tech tags, then write the full description. Blank lines create paragraphs. Optional story sections provide headings for features, challenges, your role, and results. Upload multiple gallery images and drag them into order; add descriptive alt text and optional captions. Add demo/source links and set display order (lower numbers first), then publish.

The website reads published content on each request; drafts stay private. It uses the existing server-only `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_TOKEN` environment variables. No project write endpoint or credentials are exposed to visitors. Manage Studio membership in Sanity so only your admin account has editing access; the website does not change existing project permissions. Deploy the updated Studio separately if you use a hosted Studio.

Until the first Sanity project is published, the three existing projects are shown from `lib/projects.ts`. After that, Sanity becomes the project list. The existing screenshots provide one image per project; upload more in Studio to populate the gallery. Existing project descriptions and confirmed stack details are preserved; complete any missing stack information in Studio.
