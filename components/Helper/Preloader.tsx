"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    if (phase === "done") {
      window.dispatchEvent(new Event("portfolio:preloader-done"));
    }
  }, [phase]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    let exitTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      // Allow a complete reflection sweep, even on a fast connection.
      const remaining = reducedMotion ? 0 : Math.max(0, 2800 - (performance.now() - startedAt));
      exitTimer = setTimeout(() => {
        setPhase("leaving");
        removeTimer = setTimeout(() => setPhase("done"), reducedMotion ? 0 : 600);
      }, remaining);
    };

    const fallbackTimer = setTimeout(finish, 5000);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(fallbackTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      <noscript><style>{`#portfolio-preloader { display: none; }`}</style></noscript>
      <div
        id="portfolio-preloader"
        role="status"
        aria-label="Loading portfolio"
        data-phase={phase}
        className="portfolio-preloader fixed inset-0 z-[200000] flex items-center justify-center bg-[#0d0d1f] px-6 text-white"
      >
        <div aria-hidden="true" className="flex flex-col items-center text-center">
          <p className="preloader-shine text-[clamp(1.5rem,5vw,3.5rem)] font-medium leading-tight tracking-wide">
            Shreeyash Shrestha
          </p>
          <p className="preloader-shine mt-4 text-[10px] font-normal uppercase tracking-[0.4em] sm:text-xs">
            Developer
          </p>
        </div>
        <span className="sr-only">Loading portfolio. Please wait.</span>
      </div>
    </>
  );
}
