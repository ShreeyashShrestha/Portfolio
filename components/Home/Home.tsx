"use client";
import { useEffect } from "react";
import Projects from "../Projects/Projects";
import Contact from "./Contact/Contact";
import Hero from "./Hero/Hero";
import Resume from "./Resume/Resume";
import Services from "./Services/Services";
import Skills from "./Skills/Skills";
import Testimonials from "./Testimonials/Testimonials";

import "aos/dist/aos.css";
import Aos from "aos";
import type { Project } from "@/lib/projects";

const Home = ({ projects }: { projects: Project[] }) => {
  useEffect(() => {
    let frame: number;
    let initialized = false;

    const initAos = () => {
      if (initialized) return;
      initialized = true;
      frame = requestAnimationFrame(() => {
        Aos.init({
          duration: 1000,
          easing: "ease",
          once: true,
          anchorPlacement: "top-bottom",
          // Start explicitly, including when the page loads after window.load.
          startEvent: "portfolio:aos-ready",
          disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
        document.dispatchEvent(new Event("portfolio:aos-ready"));
      });
    };

    window.addEventListener("portfolio:preloader-done", initAos);
    // Client navigation can mount Home after the initial preloader is gone.
    if (!document.getElementById("portfolio-preloader")) initAos();

    return () => {
      window.removeEventListener("portfolio:preloader-done", initAos);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <Resume />
      <Projects projects={projects} />
      <Skills />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
