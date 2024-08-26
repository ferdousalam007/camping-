import Contact from "@/components/AboutUs/Contact";
import Mission from "@/components/AboutUs/Mission";
import TeamMember from "@/components/AboutUs/TeamMember";
import PageTitle from "@/components/PageTitle";
const breadcrumbs = [
  { label: "Home", href: "/" },
  // { label: "Components", href: "/components" },
  { label: "AboutUs" }, 
];
const AboutUs = () => {
  return (
    <>
      <PageTitle title="About Us" breadcrumbs={breadcrumbs} />;
      <div className="pt-20">
        <div className="">
          <Mission />
          <TeamMember />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
