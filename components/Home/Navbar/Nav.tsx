"use client";
import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      }
      if (window.scrollY < 90) {
        setNavBg(false);
      }
    };
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      className={`transition-all ${navBg ? "bg-card/95 shadow-md" : ""} duration-200 h-20 md:h-[12vh] z-[10000] fixed inset-x-0 top-0 w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] mx-auto">
        {/* logo */}
        <Link href="/" aria-label="Shreeyash home" className="flex items-center space-x-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center flex-col">
            <FaCode className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl hidden sm:block md:text-2xl text-foreground font-bold">
            Shreeyash
          </span>
        </Link>
        {/* navLinks */}
        <div className="hidden lg:flex items-center space-x-10">
          {NavLinks.map((link) => {
            return (
              <Link
                key={link.id}
                href={link.url}
                className="text-base hover:text-brand text-foreground font-medium transition-all duration-200"
              >
                <p>{link.Label}</p>
              </Link>
            );
          })}
        </div>
        {/* buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* CV button */}
          <div>
            <a href="/Shreeyash_Shrestha_CV.pdf" download={true}>
              <button className="px-4 sm:px-8 py-3 sm:py-3.5 text-sm cursor-pointer rounded-lg bg-primary hover:bg-primary-hover transition-all duration-300 text-primary-foreground flex items-center space-x-2">
                <BiDownload className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </a>
          </div>

          <ThemeToggle />

          {/* Burger Menu */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-foreground lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
