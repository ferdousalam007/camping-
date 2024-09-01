import React, { useState } from "react";

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
import CategoryModal from "@/components/CategoryModal";
import ProductCard from "@/components/productCard/ProductCard";
import LeftTitle from "@/components/LeftTitle";
import { Category, Product } from "@/type/type";
interface ProductCat {
  _id: string;
  imageUrl: string[];
  name: string;
  description: string;
  ratings: number;
  stock: number;
  price: number;
  totalSold: number;
}
const Categories = () => {
  const { data: productsData, isLoading: isProductsLoading } =
    useGetAllproductQuery("");
  const { data: categoriesData, isLoading } = useGetCategoriesQuery("");

  // State for modal visibility and selected category
 const [selectedCategory, setSelectedCategory] = useState<Category | null>(
   null
 );
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Open modal with selected category
  const handleDetailsClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Filter products based on selected category
  const productsInCategory = validProducts?.filter(
    (product: Product) => product.category?._id === selectedCategory?._id
  );

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
                        <h3 className="mt-4 text-center text-xl font-medium">
                          {category.name}
                        </h3>
                        <div className="mt-2 text-center">
                          Total Products: {category?.productCount}
                        </div>

                        <CardFooter className="flex justify-center p-4">
                          <Button
                            className="mt-4"
                            onClick={() => handleDetailsClick(category)}
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
            <CarouselPrevious className="absolute top-[110%]  left-[45%]" />
            <CarouselNext className="absolute top-[110%] right-[45%]" />
          </Carousel>
        </div>

        {/* Modal to show products under selected category */}
        {isModalOpen && (
          <CategoryModal onClose={handleCloseModal}>
            <h2 className="text-2xl mb-4">
              Category: {selectedCategory?.name}
            </h2>
            {productsInCategory?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {productsInCategory?.map((product: ProductCat) => (
                  <ProductCard
                    key={product?._id}
                    image={product?.imageUrl ? `${product.imageUrl[0]}` : ""}
                    title={`${product?.name}`}
                    description={`${product?.description}`}
                    rating={product?.ratings}
                    stock={product?.stock}
                    id={product?._id}
                    recommended
                    price={product?.price}
                    totalSold={product?.totalSold}
                  />
                ))}
              </div>
            ) : (
              <p>No products found in this category.</p>
            )}
            <Button onClick={handleCloseModal} className="mt-4">
              Close
            </Button>
          </CategoryModal>
        )}
      </div>
    </div>
  );
};

export default Categories;
