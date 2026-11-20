import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ProjectCarousel from "@/components/Projects/ProjectCarousel";
import ProjectDescription from "@/components/Projects/ProjectDescription";
import ProjectImage from "@/components/Projects/ProjectImage";
import { getProjects } from "@/lib/sanity/projects";
import { safeProjectUrl } from "@/lib/projects";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find(item => item.slug === slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${encodeURIComponent(project.slug)}` },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = (await getProjects()).find(item => item.slug === slug);
  if (!project) notFound();
  const images = project.images.length ? project.images : [project.cover];
  const liveUrl = safeProjectUrl(project.liveUrl);
  const sourceUrl = safeProjectUrl(project.sourceUrl);
  return <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-20 text-foreground md:px-10 md:pt-24">
    <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-action-muted px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
      <ArrowLeft size={18} aria-hidden="true" />
      Back to projects
    </Link>
    <header className="mb-10 mt-10 max-w-3xl">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-brand">Project showcase</p>
      <h1 className="text-4xl font-bold md:text-6xl">{project.title}</h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{project.summary}</p>
    </header>
    <ProjectCarousel label={`${project.title} screenshots`} thumbnails={images.map((image, index) => <Image key={index} src={image.url} alt="" fill sizes="112px" className="object-contain" unoptimized={image.url.startsWith("https://")} />)}>
      {images.map((image, index) => <figure key={`${image.url}-${index}`} className="project-slide overflow-hidden rounded-2xl border border-border bg-inset">
        <ProjectImage src={image.url} alt={image.alt || project.title} caption={image.caption} images={images} index={index} />
        {image.caption && <figcaption className="px-6 pb-5 text-sm text-muted-foreground">{image.caption}</figcaption>}
      </figure>)}
    </ProjectCarousel>
    <div className="mt-16 grid items-start gap-12 md:grid-cols-[1fr_260px] md:gap-16">
      <article className="min-w-0 space-y-10">
        <section><h2 className="mb-5 text-2xl font-semibold">About the project</h2><ProjectDescription content={project.about} fallback={project.description || project.summary} /></section>
        {project.sections?.map((section, index) => <section key={index}><h2 className="mb-5 text-2xl font-semibold">{section.heading}</h2><ProjectDescription content={section.richBody} fallback={section.body || ""} /></section>)}
      </article>
      <aside className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 text-sm font-semibold">Built with</h2>
        <div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full border border-brand/20 px-3 py-1 text-xs text-brand">{tag}</span>)}</div>
        {(liveUrl || sourceUrl) && <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">{liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand">Visit live project ?</a>}{sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand">View source code ?</a>}</div>}
      </aside>
    </div>
  </main>;
}
