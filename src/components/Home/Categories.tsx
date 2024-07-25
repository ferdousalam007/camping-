import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  // Card,
  // CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 40000000, stopOnInteraction: true })
  );
  return (
    <div className="container mb-20">
      <SectionHeading
        headingText="Categories"
        paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
      />
      <div>
        <Carousel
          opts={{
            align: "end",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="container pt-8"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 ">
                <div className="p-1">
                  <Card className="border-0">
                    <CardContent className="flex flex-col items-center px-3 py-4 ">
                      <div className="h-[250px] w-[250px]  bg-white rounded-full">
                        <img
                          src="https://vitasana.qodeinteractive.com/wp-content/uploads/2024/03/HOME-3-PRODUCT-06.jpg"
                          // src={image}
                          // alt={title}
                          className="w-full h-full  object-cover  rounded-full p-4 border-[20px]"
                        />
                      </div>
                    </CardContent>
                    <div className="bg-[#F9EFE5] rounded-lg pb-4 pt-[150px] mt-[-150px]">
                      <h3 className="mt-4 text-center text-xl font-medium">
                        {/* {title} */}name
                      </h3>
                      <div className=" mt-2 text-center">Total Products:50</div>

                      <CardFooter className="flex justify-center p-4">
                        <Button className="mt-4">
                          {/* <ShoppingCartIcon className="w-5 h-5 mr-2 text-gray-100" /> */}
                          {/* <Link to={`/products/${id}`}>View Details</Link> */}
                          deatail
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-[110%]  left-[45%]" />
          <CarouselNext className="absolute top-[110%]    right-[45%]" />
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
