import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetAllproductQuery,
  useGetCategoriesQuery,
} from "@/redux/api/baseApi";
 // Assuming you have a Modal component
// Assuming you have a ProductCard component

import LeftTitle from "@/components/LeftTitle";
import { Category, Product } from "@/type/type";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();
      const handleCategoryClick = (categoryId: string) => {
        navigate(`/products?category=${categoryId}`);
      };

  const { data: productsData, isLoading: isProductsLoading } =
    useGetAllproductQuery("");
  const { data: categoriesData, isLoading } = useGetCategoriesQuery("");

 

  // Filter out deleted products
 const validProducts = productsData?.data?.result?.filter(
   (product: Product) => !product.isDeleted
 );

  // Map categories to their respective product counts
  const categoriesWithProductCounts = categoriesData?.data.map((category: Category) => {
    const productCount = validProducts?.filter(
      (product: Product) =>
        product.category && product.category._id === category._id
    ).length;
    return {
      ...category,
      productCount,
    };
  });


  



  const plugin = React.useRef(
    Autoplay({ delay: 40000000, stopOnInteraction: true })
  );
if (isLoading) {
    return <div className="text-center text-2xl">Loading categories...</div>;
}
if (isProductsLoading) {
  return <div className="text-center text-2xl">Loading products...</div>;
}
  return (
    <div className="bg-[#EDF1F0]">
      <div className="container pt-12 pb-28">
        <LeftTitle firstTitle="Categories" secondTitle="Products" />
        <div>
          <Carousel
            opts={{
              align: "end",
              loop: true,
            }}
            plugins={[plugin.current]}
            className=""
          >
            <CarouselContent>
              {categoriesWithProductCounts?.map((category: Category) => (
                <CarouselItem
                  key={category._id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="border-0">
                      <CardContent className="flex flex-col items-center px-3 py-4 ">
                        <div className="h-[250px] w-[250px] bg-white rounded-full">
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover rounded-full p-4 border-[20px]"
                          />
                        </div>
                      </CardContent>
                      <div className="bg-[#F9EFE5] rounded-lg pb-4 pt-[150px] mt-[-150px]">
                        <h3 className="mt-4 text-center text-xl font-bold">
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1).toLowerCase()}
                        </h3>

                        <CardFooter className="flex justify-center p-4 ">
                          <Button
                            className="px-8 py-3  bg-[#ff8851] text-black rounded-full shadow-lg hover:bg-[#181c20] hover:text-white transition duration-300"
                            onClick={() =>
                              handleCategoryClick(category?._id ?? "")
                            }
                          >
                            Details
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[110%]  left-[35%] md:left-[45%]" />
            <CarouselNext className="absolute top-[110%] right-[35%] md:right-[45%]" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Categories;
