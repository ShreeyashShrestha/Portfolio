"use client";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Typewriter from "typewriter-effect";
import Lanyard from "./Lanyard";

const Hero = () => {
  return (
    <div className="relative -mb-12 flex min-h-screen -translate-y-12 flex-col items-center justify-center overflow-hidden py-16 text-white md:mb-0 md:h-screen md:translate-y-0 md:flex-row md:py-0">
      <div className="hero-copy relative z-10 order-2 flex w-full flex-col items-center px-6 text-center sm:px-10 md:order-1 md:w-1/2 md:items-start md:px-8 md:text-left lg:px-14">
        <h1
          data-aos="fade-up"
          className="mt-6 text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Creating web products, <br /> brands,{" "}
          <span className="text-cyan-200">and experiences.</span>
        </h1>
        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-5 text-sm font-medium sm:text-xl md:text-lg lg:text-2xl"
        >
          Hi! I&apos;m Shreeyash - A Passionate
          <span className="text-cyan-200 font-bold">
            <Typewriter
              options={{
                strings: [
                  "Frontend Developer",
                  "Backend Developer",
                  "Web Developer",
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
          className="mt-6 rounded-full bg-blue-800 px-10 py-4 text-lg font-medium transition-all duration-300 hover:bg-blue-900"
        >
          <span>See my work</span>
          <BsArrowRight className="ml-2 inline-block h-5 w-5" />
        </Link>
      </div>
      <div className="relative z-10 order-1 h-[340px] w-full max-w-[420px] sm:h-[420px] md:order-2 md:h-[min(80vh,600px)] md:w-1/2 md:max-w-none">
        <Lanyard
          frontImage="/Images/mah.jpg"
          backImage="/Images/id-card-back.png"
          strapImage="/Images/band.png"
          imageFit="cover"
          cardColor="#ffffff"
          orientation="portrait"
          finish="glossy"
          cornerRadius={0.3}
          size={0.7}
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
      </div>
    </div>
  );
};

export default Hero;
