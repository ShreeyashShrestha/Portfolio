import sharp from "sharp";
import { getSanityClient } from "@/lib/sanity/server";
import { IMAGE_TYPES, MAX_BODY_BYTES, MAX_IMAGE_BYTES, parseTestimonial } from "@/lib/testimonials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reply = (error: string, status: number) => Response.json({ error }, { status });

export async function GET() {
  try {
    const client = getSanityClient();
    if (!client) return reply("Testimonials are not connected yet.", 503);
    const items = await client.fetch(`*[
      _type == "testimonial" && approved == true && !(_id in path("drafts.**"))
    ] | order(_createdAt desc)[0...50] {
      _id, name, jobTitle, company, review, rating, "imageUrl": image.asset->url
    }`);
    return Response.json(items, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return reply("Unable to load testimonials. Please try again later.", 502);
  }
}

// Bound the body before parsing multipart data, including requests without Content-Length.
async function readForm(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing form.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("Submission is too large. Choose a photo smaller than 2 MB.");
    }
    chunks.push(value);
  }
  return new Response(Buffer.concat(chunks), {
    headers: { "Content-Type": request.headers.get("content-type") || "" },
  }).formData();
}

export async function POST(request: Request) {
  const client = getSanityClient();
  if (!client) return reply("Review submissions are not connected yet. Please try again later.", 503);
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return reply("Invalid submission origin.", 403);
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) {
    return reply("Please submit the review form.", 415);
  }
  let form: FormData;
  try { form = await readForm(request); }
  catch { return reply("Invalid or oversized form. Photos must be smaller than 2 MB.", 400); }
  if (form.get("website")) return reply("Unable to submit this form.", 400);

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (process.env.NODE_ENV === "production" && (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)) {
    return reply("Review submissions are temporarily unavailable.", 503);
  }
  if (secret) {
    const token = form.get("cf-turnstile-response");
    if (typeof token !== "string" || !token) return reply("Please complete the spam check.", 400);
    try {
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await verification.json();
      if (!verification.ok || !result.success || result.hostname !== new URL(origin).hostname) {
        return reply("Spam check expired. Please try again.", 400);
      }
    } catch { return reply("Spam check unavailable. Please try again later.", 502); }
  }

  let data: ReturnType<typeof parseTestimonial>;
  try { data = parseTestimonial(form); }
  catch (error) { return reply((error as Error).message, 400); }
  const image = form.get("image");
  if (!(image instanceof File) || !IMAGE_TYPES.includes(image.type) || !image.size || image.size > MAX_IMAGE_BYTES) {
    return reply("Upload a JPEG, PNG, or WebP photo smaller than 2 MB.", 400);
  }
  let photo: Buffer;
  try {
    const input = Buffer.from(await image.arrayBuffer());
    const metadata = await sharp(input, { limitInputPixels: 25000000 }).metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format || "") || (metadata.pages || 1) > 1) {
      return reply("Choose a still JPEG, PNG, or WebP photo.", 400);
    }
    photo = await sharp(input, { limitInputPixels: 25000000 }).rotate()
      .resize(512, 512, { fit: "cover", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  } catch { return reply("This photo could not be read. Choose another image.", 400); }

  let assetId: string | undefined;
  try {
    const asset = await client.assets.upload("image", photo, { contentType: "image/webp", filename: "testimonial.webp" });
    assetId = asset._id;
    await client.create({
      _type: "testimonial", ...data, approved: false,
      consentedAt: new Date().toISOString(),
      image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
    });
    return Response.json({ message: "Thank you! Your review will appear after approval." }, { status: 201 });
  } catch {
    // Referenced assets cannot be deleted; never force deletion of a shared photo.
    if (assetId) await client.delete(assetId).catch(() => {});
    return reply("Unable to save your review. Please try again later.", 502);
  }
}
