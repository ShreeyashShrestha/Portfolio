import type { Metadata } from "next";
import Contact from "@/components/Home/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Shreeyash Shrestha about full-stack development, data engineering, and project collaborations.",
  alternates: { canonical: "/contact" },
};

const ContactPage = () => {
  return (
    <div className="pt-28 md:pt-[12vh]">
      <Contact />
    </div>
  );
};

export default ContactPage;
