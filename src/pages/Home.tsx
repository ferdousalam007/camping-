import Banner from "@/components/Home/Banner";
import Categories from "@/components/Home/Categories";
import Faq from "@/components/Home/Faq";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import RecommendedProduct from "@/components/Home/RecommendedProduct";
import Testimonials from "@/components/Home/Testimonials";
import VideoBlogs from "@/components/Home/VideoBlogs";

const Home = () => {
  return <>
  <div>
    <Banner/>
    <RecommendedProduct/>
    <Categories/>
    <FeaturedProducts/>
    <VideoBlogs/>
    <Testimonials/>
    <Faq/>
  </div>
  </>;
};

export default Home;
