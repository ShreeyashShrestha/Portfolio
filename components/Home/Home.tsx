import Projects from "../Projects/Projects";
import Contact from "./Contact/Contact";
import Hero from "./Hero/Hero";
import Resume from "./Resume/Resume";
import Services from "./Services/Services";
import Skills from "./Skills/Skills";

const Home = () => {
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
