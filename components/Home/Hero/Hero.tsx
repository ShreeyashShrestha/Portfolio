"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { BsArrowRight } from "react-icons/bs";
import Typewriter from "typewriter-effect";
import { isDarkMode, subscribeToTheme } from "@/lib/theme";
import Lanyard from "./Lanyard";

const Hero = () => {
  const darkMode = useSyncExternalStore(subscribeToTheme, isDarkMode, () => null);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-start gap-4 overflow-hidden pt-20 pb-12 text-foreground md:h-screen md:min-h-screen md:flex-row md:justify-center md:gap-0 md:py-0">
      <div className="hero-copy relative z-10 order-2 flex w-full flex-1 flex-col items-center justify-center px-6 pt-4 text-center sm:px-10 md:order-1 md:w-1/2 md:flex-none md:items-start md:px-8 md:pt-0 md:text-left lg:px-14">
        <h1
          data-aos="fade-up"
          className="mt-2 text-3xl md:mt-6 font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Building full-stack, <br /> apps,{" "}
          <span className="text-brand">with data intelligence</span>
        </h1>
        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-4 min-h-12 text-sm leading-relaxed font-medium md:mt-5 md:min-h-0 sm:text-xl md:text-lg lg:text-2xl"
        >
          Hi! I&apos;m Shreeyash - A Passionate
          <span className="text-brand font-bold">
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "Data Engineer",
                  "Data Enthusiast",
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                wrapperClassName: "pl-2",
              }}
            />
          </span>
        </h2>
        <Link
          href="/work"
          data-aos="fade-up"
          data-aos-anchor=".hero-copy h1"
          data-aos-delay="400"
          className="mt-8 rounded-full bg-primary px-10 py-4 text-lg font-medium text-primary-foreground transition-all duration-300 hover:bg-primary-hover md:mt-6"
        >
          <span>See my work</span>
          <BsArrowRight className="ml-2 inline-block h-5 w-5" />
        </Link>
      </div>
      <div className="pointer-events-none relative z-20 order-1 h-[320px] w-full max-w-[420px] sm:h-[440px] md:order-2 md:h-[min(80vh,600px)] md:w-1/2 md:max-w-none">
        {darkMode !== null && (
          <Lanyard
            face={darkMode ? "front" : "back"}
            frontImage="/Images/mah.jpg"
            backImage="/Images/IT-card.png"
            strapImage="/Images/band.png"
            imageFit="cover"
            cardColor="#ffffff"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.3}
            size={0.82}
            dragOverflow={450}
            anchor="center"
            strapLength={0.5}
            strapColor="#111111"
            strapWidth={0.65}
            metal="silver"
            gravity={1}
            damping={0.5}
            elasticity={0.5}
            breeze={0.5}
            interactive
            intro
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
