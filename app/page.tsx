import type { Metadata } from "next";
import Home from "@/components/Home/Home";
import { getProjects } from "@/lib/sanity/projects";
import { profileLinks, siteName, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const homeUrl = `${siteUrl}/`;
const title = `${siteName} | Full-Stack Developer`;
const description =
  "Shreeyash Shrestha is a full-stack developer in Kathmandu, Nepal, building web apps and data pipelines. Explore his projects, experience, and résumé.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName,
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      url: homeUrl,
      name: siteName,
    },
    {
      "@type": "ProfilePage",
      "@id": `${homeUrl}#profile`,
      url: homeUrl,
      isPartOf: { "@id": `${homeUrl}#website` },
      mainEntity: {
        "@type": "Person",
        "@id": `${homeUrl}#person`,
        name: siteName,
        url: homeUrl,
        jobTitle: "Full-Stack Developer",
        image: `${siteUrl}/Images/mah.jpg`,
        sameAs: Object.values(profileLinks),
      },
    },
  ],
};

const HomePage = async () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Home projects={await getProjects()} />
    </>
  );
};

export default HomePage;
