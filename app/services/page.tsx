import type { Metadata } from "next";
import Services from "@/components/Home/Services/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Shreeyash Shrestha’s services in full-stack web development, data pipelines, dashboards, and data analysis.",
  alternates: { canonical: "/services" },
};

const ServicePage = () => {
  return (
    <div className="pt-28 md:pt-[12vh]">
      <Services />
    </div>
  );
};

export default ServicePage;
