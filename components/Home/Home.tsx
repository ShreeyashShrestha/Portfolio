import Hero from "./Hero/Hero";
import Resume from "./Resume/Resume";
import Services from "./Services/Services";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <Resume />
    </div>
  );
};

export default Home;
