export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_BODY_BYTES = 3 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type Testimonial = {
  _id: string;
  name: string;
  jobTitle: string;
  company: string;
  review: string;
  rating: number;
  imageUrl: string;
};

export function parseTestimonial(form: FormData) {
  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const data = {
    name: text("name"), jobTitle: text("jobTitle"),
    company: text("company"), review: text("review"),
    rating: Number(text("rating")),
  };
  if (!data.name || data.name.length > 80 ||
      !data.jobTitle || data.jobTitle.length > 100 ||
      !data.company || data.company.length > 100 ||
      data.review.length < 20 || data.review.length > 1000 ||
      !Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    throw new Error("Complete all fields. Reviews need 20–1000 characters and a rating from 1 to 5.");
  }
  if (text("consent") !== "yes") throw new Error("Please agree to publishing your testimonial.");
  return data;
}
