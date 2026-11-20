"use client";

import { useState, type FormEvent } from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { profileLinks } from "@/lib/site";

const Contact = () => {
  const [result, setResult] = useState("");
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    setFailed(false);
    setResult("");
    if (!accessKey) {
      setFailed(true);
      setResult("The contact form is currently unavailable. Please contact me by email or phone.");
      return;
    }
    const formData = new FormData(form);
    formData.set("access_key", accessKey);
    formData.set("subject", "New portfolio contact message");
    formData.set("from_name", "Shreeyash Portfolio");
    setPending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send your message. Please try again.");
      }
      setResult("Thank you! Your message has been sent.");
      form.reset();
    } catch (error) {
      setFailed(true);
      setResult(
        controller.signal.aborted
          ? "Sending timed out. Delivery could not be confirmed. Please check your connection before trying again."
          : error instanceof TypeError
            ? "Could not connect to the form service. Please check your connection or try another browser. You can also contact me by email or phone."
            : error instanceof Error
              ? error.message
              : "Unable to send your message. Please try again.",
      );
    } finally {
      window.clearTimeout(timeout);
      setPending(false);
    }
  };
  return (
    <div className="py-10 md:py-16">
      <div className="w-full px-5 sm:w-[90%] sm:px-0 md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Text Context */}
        <div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Schedule a call with me to see if I can help
          </h1>
          <p className="text-muted-foreground mt-6 text-base sm:text-lg">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>

          {/* info */}
          <div className="mt-7">
            <div className="flex items-center space-x-3 mb-4">
              <BiPhone className="w-7 h-7 shrink-0 sm:w-9 sm:h-9 text-brand" />
              <p className="min-w-0 break-words text-base sm:text-xl font-bold text-muted-foreground">9818009299</p>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <BiEnvelope className="w-7 h-7 shrink-0 sm:w-9 sm:h-9 text-brand" />
              <p className="min-w-0 break-words text-base sm:text-xl font-bold text-muted-foreground">
                shreeyashofficialpc1@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <BiMap className="w-7 h-7 shrink-0 sm:w-9 sm:h-9 text-brand" />
              <p className="min-w-0 break-words text-base sm:text-xl font-bold text-muted-foreground">
                Bhimsengola, Purano Baneshwor, KTM
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center mt-8 space-x-3">
            <a
              href="https://www.facebook.com/shreeyash.shrestha.7/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-action-muted text-foreground rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-blue-800 hover:text-white transition-all duration-300"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href={profileLinks.github}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-action-muted text-foreground rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-black hover:text-white transition-all duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href={profileLinks.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-action-muted text-foreground rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-blue-700 hover:text-white transition-all duration-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/shreeyashshresthaa/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-action-muted text-foreground rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-pink-700 hover:text-white transition-all duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* form */}
        <form onSubmit={onSubmit} aria-label="Contact me" aria-busy={pending}>
        <div
          data-aos="zoom-in"
          data-aos-anchor-placement="top-center"
          data-aos-delay="0"
          className="md:p-10 p-5 bg-card rounded-lg"
        >
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-3.5 bg-input text-foreground outline-none rounded-md w-full placeholder:text-muted-foreground ring-1 ring-inset ring-border focus:ring-2 focus:ring-brand"
            name="name"
            autoComplete="name"
            aria-label="Name"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-3.5 mt-4 sm:mt-6 bg-input text-foreground outline-none rounded-md w-full placeholder:text-muted-foreground ring-1 ring-inset ring-border focus:ring-2 focus:ring-brand"
            name="email"
            autoComplete="email"
            aria-label="Email address"
            required
          />
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            aria-label="Mobile number"
            placeholder="Mobile Number"
            className="px-4 py-3.5 mt-4 sm:mt-6 bg-input text-foreground outline-none rounded-md w-full placeholder:text-muted-foreground ring-1 ring-inset ring-border focus:ring-2 focus:ring-brand"
          />
          <textarea
            name="message"
            aria-label="Your message"
            required
            placeholder="Your Message"
            className="px-4 py-3.5 mt-4 sm:mt-6 bg-input text-foreground outline-none rounded-md w-full placeholder:text-muted-foreground h-[10rem] ring-1 ring-inset ring-border focus:ring-2 focus:ring-brand"
          ></textarea>
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
          <button type="submit" disabled={pending} className="disabled:opacity-60 disabled:cursor-wait mt-6 w-full sm:mt-8 sm:w-auto px-6 sm:px-12 py-4 bg-primary hover:bg-primary-hover transition-all duration-300 cursor-pointer text-primary-foreground rounded-full">
            {pending ? "Sending..." : "Send Message"}
          </button>
          <p role="status" aria-live="polite" className={`mt-4 text-sm ${failed ? "text-destructive" : "text-success"}`}>{result}</p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
