import type { CSSProperties } from "react";

type Props = {
  icon: string;
  name: string;
  description: string;
};

const ServiceCard = ({ description, name, icon }: Props) => {
  return (
    <div>
      <span
        aria-hidden="true"
        className="block size-20 bg-brand mask-(--service-icon) mask-contain mask-center mask-no-repeat dark:mask-none dark:bg-transparent dark:bg-(image:--service-icon) dark:bg-contain dark:bg-center dark:bg-no-repeat"
        style={{ "--service-icon": `url("${icon}")` } as CSSProperties}
      />
      <h1 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-foreground">
        {name}
      </h1>
      <p className="mt-3 md:mt-6 text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;
