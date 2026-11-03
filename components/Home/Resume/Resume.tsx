import { FaCodepen, FaReact } from "react-icons/fa";
import ResumeCard from "./ResumeCard";
import { BsDatabase } from "react-icons/bs";
import { BiBadge } from "react-icons/bi";
import { HiAcademicCap } from "react-icons/hi2";
import { SiNextdotjs } from "react-icons/si";
import { FaRedhat } from "react-icons/fa6";

const Resume = () => {
  return (
    <div className="py-10 md:pt-20 md:pb-16">
      <div className="w-full px-5 sm:w-[85%] sm:px-0 lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Work part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            My Work <span className="text-cyan-200">Experience</span>
          </h1>
          <div
            className="mt-6 md:mt-10"
            data-aos="zoom-in"
            data-aos-anchor-placement="top-center"
          >
            <ResumeCard
              Icon={SiNextdotjs}
              role="Full-Stack Intern"
              company="NoveltyLab"
              date="May 2026 - Nov 2026"
              description="Built scalable, production-ready web app using Next.js, React, Node.js, and Docker. Focused on connecting robust database systems with automated data pipelines to deliver seamless, data-intelligent user experience."
            />
            <ResumeCard
              Icon={FaReact}
              role="Front-End Developer"
              description="Engineered high-performance, responsive web interfaces using Next.js (App Router), React, Typescript, and Tailwind CSS.Focused on building clean, accessible user interfaces, optimizing client and server-side rendering, and seamlessly consuming backend APIs to deliver fast, data-driven user experiences."
            />
            <ResumeCard
              Icon={BsDatabase}
              role="Back-End Developer"
              description="Architected scalable backend services and APIs using Node.js, Express, Next.js.Designed and optimized relational and non-relational database schemas using PostgreSQL and MongoDB, containerized microservices with Docker, and integrated automated data engineering pipelines into core application logic."
            />
          </div>
        </div>

        {/* Education Part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-cyan-200">Education</span>
          </h1>
          <div
            className="mt-6 md:mt-10"
            data-aos="zoom-out"
            data-aos-anchor-placement="top-center"
            data-aos-delay="300"
          >
            <ResumeCard
              Icon={HiAcademicCap}
              role="Bachelor in Computer Science (Honours)"
              company="IIMS College"
              date="Jan 2023 - Dec 2026"
              description="Specialized in Data Science, combining core compuiter science fundamentals with advanced data management, machine learning, and analytical modeling to build intelligent, data-driven software solutions."
            />
            <ResumeCard
              Icon={BiBadge}
              role="Data Engineering Trainig"
              company="Dlytica Academy"
              date="Nov 2025 - Mar 2026"
              description="Focused on building end-to-end data pipelines, ETL workflows, database architecture, big data processing, and cloud-based data orchestration."
            />
            <ResumeCard
              Icon={FaRedhat}
              role="Ethical Hacking"
              company="BROADWAY INFOSYS"
              date="Dec 2024 - Feb 2025"
              description="Focused on network security, vulnerability assessment, penetration testing fundamentals, and secure coding practices for web applications."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
