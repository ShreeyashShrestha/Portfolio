import type { Metadata } from "next";
import Resume from "@/components/Home/Resume/Resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Explore Shreeyash Shrestha’s full-stack development experience, education, and data engineering training.",
  alternates: { canonical: "/resume" },
};

const ResumePage = () => {
  return (
    <div className="pt-28 md:pt-[12vh]">
      <Resume />
    </div>
  );
};

export default ResumePage;
