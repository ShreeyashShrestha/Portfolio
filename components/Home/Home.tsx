"use client";
import { useEffect } from "react";
import Projects from "../Projects/Projects";
import Contact from "./Contact/Contact";
import Hero from "./Hero/Hero";
import Resume from "./Resume/Resume";
import Services from "./Services/Services";
import Skills from "./Skills/Skills";

import "aos/dist/aos.css";
import Aos from "aos";

const Home = () => {
  useEffect(() => {
    const initAos = async () => {
      await import("aos");
      Aos.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };

    initAos();
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <Resume />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;
