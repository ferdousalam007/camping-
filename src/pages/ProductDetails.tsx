/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionHeading from "@/components/SectionHeading";
import { useGetSinglProductQuery } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Heart,  ShoppingCart, Star } from "lucide-react";
import Rating from "react-rating";
import { addToCart } from "@/redux/slice/cartSlice";

//component
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSinglProductQuery(id);
  const {
    name,
    description,
    price,
    imageUrl,
    stock,
    category,
    ratings,
    featured,
    recommended,
  } = data?.data || {};

  const cartItem = useSelector((state: any) =>
    state.cart.items.find((item: any) => item.id === id)
  );
  console.log(id);

  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );
  console.log(data?.data);

  if (!data?.data)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Product not found
      </p>
    );

  const handleAddToCart = () => {
    if (cartItem && cartItem.quantity >= stock) {
      return;
    }
    dispatch(addToCart(id as string));
  };

  return (
    <div className="container py-14">
      <SectionHeading
        headingText="Product Details"
        paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
      />
      <div className="flex flex-col items-center p-4  text-black min-h-screen">
        <div className="max-w-6xl w-full  rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
          <div className="flex flex-col md:flex-row">
            <img
              src={imageUrl}
              alt="Movie Poster"
              className="w-full md:w-1/3 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col justify-between">
              <div className="text-gray-900 mb-4">
                <h2 className="text-4xl font-extrabold mb-4">{name}</h2>
                <div className="mb-2 flex items-center">
                  <span className="font-semibold text-yellow-500">
                    Customer reviews:
                  </span>
                  <div className="ml-2 flex">
                    {/* @ts-expect-error their is no type declaration file for react rating*/}
                    <Rating
                      placeholderRating={ratings}
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
                </div>
                <p className="mb-2">
                  <span className="font-semibold text-yellow-500">
                    Description:
                  </span>
                  {description}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-yellow-500">Price:</span>
                  {price}
                </p>
                <p className="mb-4">
                  <span className="font-semibold text-yellow-500">
                    Category:
                  </span>{" "}
                  {category?.name}
                </p>
              </div>
              <p className="text-justify mb-4">{data?.description}</p>
              <div className="flex space-x-4 mb-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-bold flex items-center hover:bg-yellow-400"
                >
                  <ShoppingCart className="mr-2" /> Add to Cart
                </Button>
                <Button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg font-bold flex items-center hover:bg-gray-600">
                  <Heart className="mr-2" /> Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
