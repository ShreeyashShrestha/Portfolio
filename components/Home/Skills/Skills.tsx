import LogoLoop from "../Skills/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  {
    node: <SiReact />,
    title: "React",
    href: "https://react.dev",
    hoverColor: "#61dafb",
  },
  {
    node: <SiNextdotjs />,
    title: "Next.js",
    href: "https://nextjs.org",
    hoverColor: "#a3a3a3",
  },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
    hoverColor: "#3178c6",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
    hoverColor: "#38bdf8",
  },
];

const Skills = () => {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <h2 className="mb-8 text-center text-2xl font-bold text-white md:mb-10 md:text-4xl xl:text-5xl">
        My <span className="text-cyan-300">Skills</span>
      </h2>
      <LogoLoop
        logos={techLogos}
        className="text-white"
        speed={100}
        direction="left"
        logoHeight={44}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        labels="inline"
        ariaLabel="Technology partners"
      />
    </section>
  );
};

export default Skills;
