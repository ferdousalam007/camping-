import SectionHeading from "@/components/SectionHeading";
import blog1 from "./../../assets/blog1.jpg";
import blog2 from "./../../assets/blog2.png";
import VideoPopup from "@/components/VideoPopup";
const VideoBlogs = () => {
  return (
    <div className="container">
      <SectionHeading
        headingText="Video Blogs"
        paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
      />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-11 pt-10 pb-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-custom rounded-lg">
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
            <VideoPopup videoUrl="https://www.youtube.com/watch?v=L61p2uyiMSo" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-custom rounded-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlogs;
