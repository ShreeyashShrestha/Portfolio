import Image from "next/image";

type Props = {
  icon: string;
  name: string;
  description: string;
};

const ServiceCard = ({ description, name, icon }: Props) => {
  return (
    <div>
      <Image src={icon} alt="img" width={80} height={80} />
      <h1 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-gray-200">
        {name}
      </h1>
      <p className="mt-3 md:mt-6 text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;
