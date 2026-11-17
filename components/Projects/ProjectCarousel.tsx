"use client";
import { Children, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function ProjectCarousel({ children, label, thumbnails }: { children: ReactNode; label: string; thumbnails?: ReactNode[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const drag = useRef<{ id: number; x: number; scroll: number; index: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const count = Children.count(children);
  const arrowClass = "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#0d0d1f]/95 text-white shadow-lg transition-colors hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white md:grid";
  const go = (index: number) => {
    const element = track.current;
    const child = element?.children[index] as HTMLElement | undefined;
    if (element && child) element.scrollTo({ left: child.offsetLeft - (element.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const finishDrag = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    drag.current = null;
    const element = event.currentTarget;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    if (!current.moved) return;
    const distance = current.x - event.clientX;
    const width = (element.children[0] as HTMLElement)?.offsetWidth || element.clientWidth;
    const steps = Math.abs(distance) >= 40 ? Math.sign(distance) * Math.max(1, Math.round(Math.abs(distance) / width)) : 0;
    go(Math.max(0, Math.min(count - 1, current.index + (cancelled ? 0 : steps))));
  };
  return <div role="region" aria-roledescription="carousel" aria-label={label} className={thumbnails ? "project-gallery" : ""}>
    <div className="relative">
    <div ref={track} className="project-track" tabIndex={0}
    onDragStart={event => event.preventDefault()}
    onPointerDown={event => {
      suppressClick.current = false;
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      drag.current = { id: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft, index: active, moved: false };
    }}
    onPointerMove={event => {
      const current = drag.current;
      if (!current || current.id !== event.pointerId) return;
      const distance = event.clientX - current.x;
      if (!current.moved && Math.abs(distance) < 6) return;
      if (!current.moved) {
        current.moved = true;
        suppressClick.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.classList.add("is-dragging");
      }
      event.preventDefault();
      event.currentTarget.scrollLeft = current.scroll - distance;
    }}
    onPointerUp={event => finishDrag(event)}
    onPointerCancel={event => finishDrag(event, true)}
    onLostPointerCapture={event => finishDrag(event, true)}
    onPointerLeave={event => { if (drag.current && !drag.current.moved) drag.current = null; }}
    onClickCapture={event => {
      if (suppressClick.current && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    }}
    onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault(); go(Math.max(0, Math.min(count - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
      }
    }} onScroll={() => {
      const element = track.current;
      if (!element) return;
      const first = (element.children[0] as HTMLElement)?.offsetLeft || 0;
      let nearest = 0;
      Array.from(element.children).forEach((child, index) => {
        if (Math.abs((child as HTMLElement).offsetLeft - first - element.scrollLeft) < Math.abs((element.children[nearest] as HTMLElement).offsetLeft - first - element.scrollLeft)) nearest = index;
      });
      setActive(nearest);
    }}>{children}</div>
      <button type="button" aria-label="Previous slide" disabled={active === 0} onClick={() => go(active - 1)} className={`${arrowClass} left-2`}><ChevronLeft size={20} /></button>
      <button type="button" aria-label="Next slide" disabled={active === count - 1} onClick={() => go(active + 1)} className={`${arrowClass} right-2`}><ChevronRight size={20} /></button>
    </div>
    <div className="mt-6 flex items-center justify-center gap-4 px-6 md:px-10">
      <p className="text-xs tabular-nums text-slate-400" aria-live="polite">{String(active + 1).padStart(2, "0")} <span className="px-2 text-slate-600">/</span> {String(count).padStart(2, "0")}</p>
    </div>
    {thumbnails && count > 1 && <div className="mt-5 flex gap-3 overflow-x-auto pb-2" aria-label="Choose an image">{thumbnails.map((thumbnail, index) => <button key={index} type="button" onClick={() => go(index)} aria-label={`Show image ${index + 1}`} aria-pressed={active === index} className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${active === index ? "border-cyan-300" : "border-white/10 opacity-60"}`}>{thumbnail}</button>)}</div>}
  </div>;
}
