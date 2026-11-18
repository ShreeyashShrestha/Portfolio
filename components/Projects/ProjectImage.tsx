"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage as GalleryImage } from "@/lib/projects";

export default function ProjectImage({ src, alt, caption, images, index = 0 }: { src: string; alt: string; caption?: string; images?: GalleryImage[]; index?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(index);
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const gallery = images?.length ? images : [{ url: src, alt, caption }];
  const current = gallery[active] || gallery[0];
  const go = (step: number) => setActive(value => Math.max(0, Math.min(gallery.length - 1, value + step)));
  const arrowClass = "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/80 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300 disabled:opacity-30 md:grid";

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <>
    <button type="button" onClick={() => { setActive(index); setOpen(true); }} aria-label={`Enlarge image: ${alt}`} aria-haspopup="dialog"
      className="relative block aspect-[16/10] w-full cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand md:aspect-video">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 1100px" className="object-contain p-3 md:p-6" unoptimized={src.startsWith("https://")} />
    </button>
    <dialog ref={dialog} aria-label={`Enlarged image: ${current.alt || alt}`} onClose={() => { swipe.current = null; setOpen(false); }}
      onKeyDown={event => {
        event.stopPropagation();
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          go(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      onPointerDown={event => {
        event.stopPropagation();
        if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
        swipe.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }}
      onPointerMove={event => event.stopPropagation()}
      onPointerUp={event => {
        event.stopPropagation();
        const start = swipe.current;
        swipe.current = null;
        if (!start || start.id !== event.pointerId) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) {
          go(dx < 0 ? 1 : -1);
        }
      }}
      onPointerCancel={event => { event.stopPropagation(); swipe.current = null; }}
      onDragStart={event => event.preventDefault()}
      onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}
      className="fixed inset-0 m-auto h-dvh max-h-none w-screen max-w-none touch-pan-y select-none border-0 bg-transparent p-4 text-white backdrop:bg-black/95 open:flex open:flex-col open:items-center open:justify-center md:p-8">
      {open && <>
        <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close enlarged image" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/80 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"><X size={24} /></button>
        <figure className="pointer-events-none flex max-h-full w-full min-h-0 flex-col items-center gap-4 pt-12">
          <div className="relative min-h-0 w-full flex-1" style={{ height: "calc(100dvh - 10rem)", flexBasis: "auto" }}>
            <Image src={current.url} alt={current.alt || alt} fill sizes="100vw" className="pointer-events-auto object-contain" unoptimized />
          </div>
          {current.caption && <figcaption className="pointer-events-auto max-h-24 max-w-3xl shrink-0 overflow-y-auto text-center text-sm text-slate-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{current.caption}</figcaption>}
        </figure>
        {gallery.length > 1 && <>
          <button type="button" aria-label="Previous image" disabled={active === 0} onClick={() => go(-1)} className={`${arrowClass} left-4`}><ChevronLeft size={24} /></button>
          <button type="button" aria-label="Next image" disabled={active === gallery.length - 1} onClick={() => go(1)} className={`${arrowClass} right-4`}><ChevronRight size={24} /></button>
          <p aria-live="polite" className="pointer-events-none mt-3 text-sm tabular-nums text-slate-300">{active + 1} / {gallery.length}</p>
        </>}
      </>}
    </dialog>
  </>;
}
