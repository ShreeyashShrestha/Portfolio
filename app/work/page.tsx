import Projects from "@/components/Projects/Projects";
import { getProjects } from "@/lib/sanity/projects";

export const dynamic = "force-dynamic";

const WorkPage = async () => {
  return (
    <div className="pt-28 md:pt-[12vh]">
      <Projects projects={await getProjects()} />
    </div>
  );
};

export default WorkPage;
