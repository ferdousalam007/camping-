import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/productCard/ProductCard";

const FeaturedProducts = () => {
  return (
    <div className="container">
      <SectionHeading
        headingText="Featured Products"
        paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default FeaturedProducts;
