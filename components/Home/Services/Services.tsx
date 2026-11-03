import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <div className="py-10 md:py-16">
      <h1 className="px-5 text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
        Collaborate with brands <br /> and agencies to create <br /> impactful
        results
      </h1>
      <div className="w-full px-5 sm:w-[85%] sm:px-0 lg:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 md:gap-10 md:mt-20 items-start">
        <div data-aos="fade-right" data-aos-anchor-placement="top-center">
          <ServiceCard
            icon="/Images/s2.png"
            name="Full-Stack Web Development"
            description="Modern Uis, REST APIs, custom backends, and relational/non-relational database design."
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          data-aos-delay="100"
        >
          <ServiceCard
            icon="/Images/data_pipeline.png"
            name="Data Engineering & Pipelines"
            description="Automated data pipelines, backend data flow, database optimization, and containerization."
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          data-aos-delay="200"
        >
          <ServiceCard
            icon="/Images/web_integration.png"
            name="Intelligent Web Integration"
            description="Interactive dashboards, data-driven features, and seamless backend-to-analytics flow."
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          data-aos-delay="300"
        >
          <ServiceCard
            icon="/Images/data_analysis.png"
            name="Data Analysis & Insights"
            description="Dataset cleaning, statistical analysis, KPI tracking, and actionable reporting."
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
