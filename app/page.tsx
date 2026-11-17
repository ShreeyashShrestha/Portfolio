import Home from "@/components/Home/Home";
import { getProjects } from "@/lib/sanity/projects";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  return <Home projects={await getProjects()} />;
};

export default HomePage;
