"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CircularCarousel from "../CircularCarousel";
import type { Project } from "@/lib/projects";

export default function Projects({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [cardWidth, setCardWidth] = useState(420);

  useEffect(() => {
    const resizeCards = () => {
      setCardWidth(window.innerWidth >= 1024
        ? Math.min(860, Math.max(640, Math.round(window.innerWidth * 0.58)))
        : 420);
    };
    resizeCards();
    window.addEventListener("resize", resizeCards);
    return () => window.removeEventListener("resize", resizeCards);
  }, []);
  const items = projects.map(project => ({
    src: project.cover.url,
    alt: project.cover.alt,
    title: project.title,
    subtitle: project.summary,
    objectFit: "contain" as const,
  }));

  return (
    <section id="projects" className="pt-10 pb-10" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="px-5 text-center text-2xl md:text-4xl xl:text-5xl font-bold text-foreground">
        A small selection of recent <br /> <span className="text-brand">projects</span>
      </h2>
      {items.length ? (
        <div className="relative h-[560px] w-full md:h-[700px]">
          <CircularCarousel
            items={items}
            preset="panorama"
            intro="rise"
            cardWidth={cardWidth}
            aspectRatio={cardWidth > 420 ? 1.6 : 1.1}
            speed={14}
            captions
            gap={25}
            tilt={0}
            curve={0}
            perspective={1800}
            autoplay="drift"
            interval={3}
            direction="left"
            momentum={0.6}
            snap
            pauseOnHover
            focusOnClick
            draggable
            parallax={0.3}
            stretch={0.5}
            fadeColor="var(--background)"
            depthFade={0.55}
            innerShade={0.6}
            cornerRadius={12}
            onItemClick={(_, index) => {
              const project = projects[index];
              if (project) router.push(`/projects/${encodeURIComponent(project.slug)}`);
            }}
          />
        </div>
      ) : <p className="mt-8 text-center text-muted-foreground">New projects are on the way.</p>}
    </section>
  );
}
