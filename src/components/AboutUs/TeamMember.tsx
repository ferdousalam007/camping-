import SectionHeading from "@/components/SectionHeading"
import TeamCard from "./TeamCard";
import img1 from "../../assets/team1.jpg"
import img2 from "../../assets/team2.jpg"
import img3 from "../../assets/team3.jpg"
import img4 from "../../assets/team4.jpg"
 const teamMembers = [
   {
     imageUrl:img1,
     name: "Andrew Wills",
     position: "CEO",
     socialLinks: {
       facebook: "https://facebook.com",
       twitter: "https://twitter.com",
       youtube: "https://youtube.com",
       linkedin: "https://linkedin.com",
       instagram: "https://instagram.com",
     },
   },
   {
     imageUrl:img2,
     name: "Sarah Connor",
     position: "CTO",
     socialLinks: {
       facebook: "https://facebook.com",
       twitter: "https://twitter.com",
       youtube: "https://youtube.com",
       linkedin: "https://linkedin.com",
       instagram: "https://instagram.com",
     },
   },
   {
     imageUrl:img3,
     name: "John Doe",
     position: "Marketing Director",
     socialLinks: {
       facebook: "https://facebook.com",
       twitter: "https://twitter.com",
       youtube: "https://youtube.com",
       linkedin: "https://linkedin.com",
       instagram: "https://instagram.com",
     },
   },
   {
     imageUrl:img4,
     name: "Jane Doe",
     position: "Accountant",
     socialLinks: {
       facebook: "https://facebook.com",
       twitter: "https://twitter.com",
       youtube: "https://youtube.com",
       linkedin: "https://linkedin.com",
       instagram: "https://instagram.com",
     },
   },
 ];

const TeamMember = () => {
  return (
    <>
      <div className="py-20">
        <SectionHeading
          headingText="Meet Our Team"
          paragraphText="Meet the team behind Campers Shop"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              imageUrl={member.imageUrl}
              name={member.name}
              position={member.position}
              socialLinks={member.socialLinks}
            />
          ))}
         
        </div>
      </div>
    </>
  );
}

export default TeamMember