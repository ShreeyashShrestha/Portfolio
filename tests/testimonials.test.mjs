import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTestimonial } from "../lib/testimonials.ts";

function valid() {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: " Alex ", jobTitle: "Developer", company: "Example", review: "A thoughtful and reliable collaborator.", rating: "5", consent: "yes" })) form.set(key, value);
  return form;
}

test("trims input and excludes visitor-supplied approval", () => {
  const form = valid();
  form.set("approved", "true");
  const result = parseTestimonial(form);
  assert.equal(result.name, "Alex");
  assert.equal(result.rating, 5);
  assert.equal("approved" in result, false);
});

test("rejects invalid ratings, short reviews, missing consent and non-text names", () => {
  for (const [key, value] of [["rating", "0"], ["rating", "6"], ["rating", "2.5"], ["rating", "NaN"], ["review", "short"], ["consent", "no"], ["name", new Blob(["fake"])], ["company", " "]]) {
    const form = valid();
    form.set(key, value);
    assert.throws(() => parseTestimonial(form));
  }
});
