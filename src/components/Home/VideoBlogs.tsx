import SectionHeading from "@/components/SectionHeading";
import blog1 from "./../../assets/tent-sites.jpg";
import blog2 from "./../../assets/blog1.webp";
import VideoPopup from "@/components/VideoPopup";
const VideoBlogs = () => {
  return (
    <div className="bg-[#EDF1F0] py-12">
      <div className="container">
        <SectionHeading
          headingText="Video Blogs"
          paragraphText="Watch our latest video blogs for expert camping tips and adventure inspiration!"
        />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-11 pt-12 pb-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-custom rounded-lg relative">
            <div className="w-full h-[325px]">
              <img
                src={blog1}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="p-5 space-y-3 flex flex-col justify-center">
              <h4 className="font-bold text-2xl">
                Why a visual identity system is more memorable
              </h4>
              <p className="text-base">
                Lorem ipsum dolor sito amet, conse ctetuer adipiscing elit sed
                diam nonum nibhie euisod. Facilisis at vero
              </p>
              <p className="text-base font-semibold">August 23, 2019</p>
              <VideoPopup videoUrl="https://www.youtube.com/watch?v=HkX0NE7Ujeg" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-custom rounded-lg relative ">
            <div className="w-full h-[325px] ">
              <img
                src={blog2}
                alt="blog2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="p-5 space-y-3 flex flex-col justify-center">
              <h4 className="font-bold text-2xl">
                Why a visual identity system is more memorable
              </h4>
              <p className="text-base">
                Lorem ipsum dolor sito amet, conse ctetuer adipiscing elit sed
                diam nonum nibhie euisod. Facilisis at vero
              </p>
              <p className="text-base font-semibold">August 23, 2019</p>
              <VideoPopup videoUrl="https://www.youtube.com/watch?v=WdXnHb7s7Is" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlogs;
