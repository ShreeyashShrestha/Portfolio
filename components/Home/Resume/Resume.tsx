import { FaCodepen, FaReact } from "react-icons/fa";
import ResumeCard from "./ResumeCard";
import { BsDatabase } from "react-icons/bs";
import { BiBadge } from "react-icons/bi";

const Resume = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Work part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            My Work <span className="text-cyan-200">Experience</span>
          </h1>
          <div className="mt-10">
            <ResumeCard Icon={FaCodepen} role="Full-Stack Developer" />
            <ResumeCard Icon={FaReact} role="Front-End Developer" />
            <ResumeCard Icon={BsDatabase} role="Back-End Developer" />
          </div>
        </div>

        {/* Education Part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-cyan-200">Education</span>
          </h1>
          <div className="mt-10">
            <ResumeCard
              Icon={BiBadge}
              role="Design Institute of Technology"
              date="Jan 2023 - Dec 2024"
            />
            <ResumeCard
              Icon={FaReact}
              role="Bachelor in Computer Science"
              date="Jan 2019 - Dec 2022"
            />
            <ResumeCard
              Icon={BsDatabase}
              role="Certificate in Digital Marketing"
              date="Jan 2016 - Dec 2019"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
