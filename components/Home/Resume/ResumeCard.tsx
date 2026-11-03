import { IconType } from "react-icons";

type Props = {
  role: string;
  Icon: IconType;
  date?: string;
  description: string;
  company?: string;
};

const ResumeCard = ({ Icon, role, date, description, company }: Props) => {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 sm:gap-6 bg-blue-950/20 transition-all duration-300 p-4 sm:p-8 rounded-md">
        <div className="w-10 h-10 shrink-0 sm:w-14 sm:h-14 bg-blue-950 rounded-full flex items-center justify-center flex-col">
          <Icon className="sm:w-8 sm:h-8 w-6 h-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          {date && (
            <h1 className="mb-2 sm:px-6 sm:py-1.5 px-3 py-1 rounded-xl sm:rounded-full bg-gray-200 text-gray-600 w-fit sm:text-lg text-sm font-bold">
              {date}
            </h1>
          )}
          {company && (
            <h1 className="mb-2 sm:px-6 sm:py-1.5 px-3 py-1 rounded-xl sm:rounded-full bg-gray-200 text-gray-600 w-fit sm:text-lg text-sm font-bold">
              {company}
            </h1>
          )}
          <h1 className="text-gray-200 text-xl sm:text-2xl font-semibold">
            {role}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed pt-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
