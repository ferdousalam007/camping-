import Contact from "@/components/AboutUs/Contact";
import Mission from "@/components/AboutUs/Mission";
import TeamMember from "@/components/AboutUs/TeamMember";

const AboutUs = () => {
  return (
    <div className="pt-20">
      <div className="container">
        <Mission/>
        <TeamMember/>
        <Contact/>
      </div>
    </div>
  )
};

export default AboutUs;
