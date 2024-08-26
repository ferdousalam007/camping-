import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "react-rating";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import img1 from "./../../assets/testimonial1.jpg";
import img2 from "./../../assets/testimonial2.jpg";
import img3 from "./../../assets/testimonial3.jpg";
import img4 from "./../../assets/testimonial4.jpg";
import img5 from "./../../assets/testimonial5.jpg";
import img6 from "./../../assets/testimonial6.jpg";

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

const Testimonial = [
  {
    img: img1,
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium",
    rating: 5,
  },
  {
    img: img2,
    name: "John Smith",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium",
    rating: 4.5,
  },
  {
    img: img3,
    name: "John Smith",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium",
    rating: 4,
  },
  {
    img: img4,
    name: "John Smith",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium",
    rating: 3.8,
  },
  {
    img: img5,
    name: "John Smith",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium",
    rating: 4.8,
  },
  {
    img: img6,
    name: "John Smith",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium",
    rating: 5,
  },
];

const Testimonials = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 40000000, stopOnInteraction: true })
  );
  return (
    <div className="bg-custom-bg  bg-cover  bg-no-repeat min-h-[700px] w-full py-20">
      <div className="container">
        <SectionHeading
          textColor="text-white"
          headingText="Happy Customer"
          paragraphText="See what our happy campers are saying about their experience with us!"
        />
        <div className="pt-12">
          <Carousel
            opts={{
              align: "end",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="container pt-8"
          >
            <CarouselContent>
              {Testimonial.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/4 "
                >
                  <div className="">
                    <Card className="border-0 ">
                      <CardContent className="flex flex-col items-center px-3 py-4 ">
                        <div className="h-[100px] w-[100px]">
                          <img
                            src={testimonial.img}
                            alt={testimonial.name}
                            className="w-full h-full  object-cover  rounded-full p-4 border-2"
                          />
                        </div>
                      </CardContent>

                      <div className="bg-[#F9EFE5] rounded-lg pb-4 px-3 pt-3">
                        <div className="flex flex-col items-center">
                          {/* @ts-expect-error their is no type declaration file for react rating*/}
                          <Rating
                            placeholderRating={testimonial?.rating}
                            readonly
                            emptySymbol={<Star size={15} color="orange" />}
                            placeholderSymbol={
                              <Star size={15} color="orange" fill="orange" />
                            }
                            fullSymbol={
                              <Star size={15} color="orange" fill="orange" />
                            }
                          />
                        </div>
                        <p className="mt-4 text-center text-base font-medium">
                          {testimonial.description}
                        </p>

                        <CardFooter className="flex justify-center flex-col p-4">
                          <div className=" mt-2 text-center uppercase font-medium">
                            - {testimonial.name}
                          </div>
                        </CardFooter>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[110%] left-[40%]  md:left-[45%]" />
            <CarouselNext className="absolute top-[110%]  right-[35%]  md:right-[45%]" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
