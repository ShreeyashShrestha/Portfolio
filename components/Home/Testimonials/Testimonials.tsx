"use client";

import { useEffect, useState, type FormEvent } from "react";
import Script from "next/script";
import { MAX_IMAGE_BYTES, IMAGE_TYPES, type Testimonial } from "@/lib/testimonials";

const inputClass = "mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30";
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [failed, setFailed] = useState(false);
  const [rating, setRating] = useState(0);
  const [captchaVersion, setCaptchaVersion] = useState(0);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/testimonials", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load testimonials right now.");
        setItems(await response.json());
        setLoadError("");
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadError("Testimonials are currently unavailable. Please check back soon.");
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (!siteKey || !scriptReady) return;
    const turnstile = (window as unknown as {
      turnstile?: { render: (selector: string, options: object) => string; remove: (id: string) => void };
    }).turnstile;
    if (!turnstile) return;
    const id = turnstile.render("#testimonial-captcha", { sitekey: siteKey, theme: "dark" });
    return () => turnstile.remove(id);
  }, [scriptReady, captchaVersion]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const photo = data.get("image");
    setNotice("");
    setFailed(false);
    if (!(photo instanceof File) || !IMAGE_TYPES.includes(photo.type) || photo.size > MAX_IMAGE_BYTES || !photo.size) {
      setFailed(true);
      setNotice("Choose a JPEG, PNG, or WebP photo smaller than 2 MB.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/testimonials", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit your review.");
      setNotice(result.message);
      form.reset();
      setRating(0);
    } catch (error) {
      setFailed(true);
      setNotice(error instanceof Error ? error.message : "Unable to submit your review.");
    } finally {
      setPending(false);
      setCaptchaVersion((value) => value + 1);
    }
  }

  return (
    <section id="testimonials" aria-labelledby="testimonial-heading" className="py-10 md:py-20 text-foreground">
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} />}
      <div className="mx-auto w-full px-5 sm:w-[90%] sm:px-0 md:w-[80%] lg:w-[70%]">
        <p className="mb-3 text-sm font-semibold tracking-widest text-brand uppercase">Kind words</p>
        <h2 id="testimonial-heading" className="text-3xl font-bold sm:text-4xl">What people <span className="text-brand">say</span></h2>
        <p className="mt-4 max-w-xl text-muted-foreground">Worked with me? Share your experience and help others get to know my work.</p>
        <div className="mt-6 grid items-start gap-6 md:mt-10 md:gap-10 xl:grid-cols-2">
          <div
            className="min-w-0"
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
          >
            {items.length > 0 && <p id="reviews-scroll-help" className="mb-3 text-sm text-muted-foreground">Scroll to read more reviews.</p>}
          <div
            role="region"
            aria-label="Reviews from people I have worked with"
            aria-describedby={items.length > 0 ? "reviews-scroll-help" : undefined}
            tabIndex={items.length > 0 ? 0 : undefined}
            className="max-h-[min(70vh,44rem)] space-y-5 overflow-y-auto rounded-xl pr-3 [scrollbar-color:var(--brand)_var(--card)] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            aria-live="polite"
          >
            {loading && <p className="text-muted-foreground">Loading testimonials…</p>}
            {loadError && <div className="rounded-xl border border-border p-6 text-muted-foreground"><p>{loadError}</p><button type="button" onClick={() => { setLoading(true); setLoadError(""); setAttempt((value) => value + 1); }} className="mt-3 text-brand underline">Try again</button></div>}
            {!loading && !loadError && items.length === 0 && <div className="rounded-xl border border-border bg-card p-5 text-card-foreground sm:p-8"><h3 className="text-xl font-semibold">Your experience matters</h3><p className="mt-3 text-muted-foreground">Be the first to leave a review. Approved testimonials will appear here.</p></div>}
            {items.map((item) => <article key={item._id} className="rounded-xl border border-border bg-card p-4 text-card-foreground sm:p-6">
              <div className="flex items-center gap-4">
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                )}
                <div className="min-w-0"><h3 className="font-semibold break-words">{item.name}</h3><p className="text-sm text-muted-foreground break-words">{item.jobTitle} at {item.company}</p></div>
              </div>
              <p className="mt-4 text-xl text-highlight" aria-label={`${item.rating} out of 5 stars`}><span aria-hidden="true">{"★".repeat(Math.max(0, Math.min(5, Math.round(item.rating))))}</span></p>
              <blockquote className="mt-3 whitespace-pre-wrap text-muted-foreground break-words">{item.review}</blockquote>
            </article>)}
          </div>
          </div>
          <form
            onSubmit={submit}
            className="min-w-0 rounded-xl bg-card p-4 text-card-foreground sm:p-8"
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
            data-aos-delay="100"
          >
            <h3 className="text-2xl font-semibold">Leave a review</h3>
            <p className="mt-2 text-sm text-muted-foreground">Reviews are checked before appearing on the website.</p>
            <fieldset disabled={pending} className="mt-6 space-y-5 disabled:opacity-60">
              <legend className="sr-only">Your testimonial</legend>
              <label className="block text-sm">Full name<input name="name" autoComplete="name" required maxLength={80} className={inputClass} /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">Current job title<input name="jobTitle" autoComplete="organization-title" required maxLength={100} className={inputClass} /></label>
                <label className="block text-sm">Company<input name="company" autoComplete="organization" required maxLength={100} className={inputClass} /></label>
              </div>
              <label className="block text-sm">Your photo<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required aria-describedby="photo-help" className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-brand file:px-3 file:py-1 file:text-background`} /><span id="photo-help" className="mt-2 block text-xs text-muted-foreground">JPEG, PNG, or WebP · Maximum 2 MB. Your photo will be public if published.</span></label>
              <fieldset><legend className="mb-2 text-sm">Your rating</legend><div className="flex flex-wrap gap-2">{[1, 2, 3, 4, 5].map((value) => <label key={value} className="cursor-pointer"><input className="peer sr-only" type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required /><span className={`flex h-11 w-11 items-center justify-center rounded-lg border text-2xl peer-focus-visible:ring-2 peer-focus-visible:ring-brand ${value <= rating ? "border-highlight/60 bg-highlight/10 text-highlight" : "border-border text-muted-foreground"}`} aria-hidden="true">★</span><span className="sr-only">{value} out of 5 stars</span></label>)}</div></fieldset>
              <label className="block text-sm">Your review<textarea name="review" required minLength={20} maxLength={1000} rows={5} className={`${inputClass} resize-y`} placeholder="What was it like working together?" /><span className="mt-2 block text-xs text-muted-foreground">20–1000 characters</span></label>
              <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground"><input className="mt-1 accent-brand" type="checkbox" name="consent" value="yes" required /><span>I agree to my name, job title, company, photo, review, and rating being published on this portfolio.</span></label>
              {siteKey && <div className="max-w-full overflow-x-auto"><div id="testimonial-captcha" /></div>}
              <button type="submit" className="w-full cursor-pointer rounded-lg bg-brand px-6 py-3 font-semibold text-background transition hover:bg-brand/95 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-wait">{pending ? "Submitting…" : "Submit review"}</button>
            </fieldset>
            <p role="status" aria-live="polite" className={`mt-4 text-sm ${failed ? "text-destructive" : "text-success"}`}>{notice}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
