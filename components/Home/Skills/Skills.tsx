import LogoLoop from "../Skills/LogoLoop";
import {
  SiCss,
  SiDocker,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiApachespark,
  SiApacheairflow,
  SiReact,
  SiSupabase,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  {
    node: <SiHtml5 />,
    title: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    hoverColor: "#e34f26",
  },
  {
    node: <SiCss />,
    title: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    hoverColor: "#1572b6",
  },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    hoverColor: "#f7df1e",
  },
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
  {
    node: <SiMongodb />,
    title: "MongoDB",
    href: "https://www.mongodb.com",
    hoverColor: "#47a248",
  },
  {
    node: <SiDocker />,
    title: "Docker",
    href: "https://www.docker.com",
    hoverColor: "#2496ed",
  },
  {
    node: <SiSupabase />,
    title: "Supabase",
    href: "https://supabase.com",
    hoverColor: "#3ecf8e",
  },
  {
    node: <SiGithub />,
    title: "GitHub",
    href: "https://github.com",
    hoverColor: "#a3a3a3",
  },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
    hoverColor: "#4169e1",
  },
  {
    node: <SiPython />,
    title: "Python",
    href: "https://www.python.org",
    hoverColor: "#3776ab",
  },
  {
    node: <SiApachespark />,
    title: "Apache Spark",
    href: "https://spark.apache.org",
    hoverColor: "#e25a1c",
  },
  {
    node: <SiApacheairflow />,
    title: "Apache Airflow",
    href: "https://airflow.apache.org",
    hoverColor: "#017cee",
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
