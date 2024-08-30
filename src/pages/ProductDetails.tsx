import { Toaster, toast } from "sonner";
import { useGetSinglProductQuery } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Rating from "react-rating";
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store";
import ProductSlider from "@/components/ProductSlider";
import PageTitle from "@/components/PageTitle";

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

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item: any) => item.id === id)
  );

  // Select the current state of the wishlist
  const wishListItems = useSelector((state: any) =>
    state.cart.wishList.filter((item: any) => item.id === id)
  );

  const handleAddToCart = () => {
    if (cartItem && cartItem.quantity >= stock) {
      toast.error("This item is are not available in stock.", { duration: 2000 });
      return;
    }
    dispatch(addToCart(id as string));
    toast.success("Item added to cart!", { duration: 2000 });
  };

  const handleAddToWishlist = () => {
    if (wishListItems.length > 0) {
      dispatch(removeFromWishList(id as string));
      toast.success("Removed from wishlist!", { duration: 2000 });
    } else {
      dispatch(addToWishList(id as string));
      toast.success("Added to wishlist!", { duration: 2000 });
    }
  };

  if (isLoading)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Loading....
      </p>
    );

  if (!data?.data)
    return (
      <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
        Product not found
      </p>
    );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: `${name}` },
  ];

  return (
    <>
      {/* Add Toaster component to render the toast messages */}
      <Toaster position="top-center" richColors />

      <PageTitle title="Product Details" breadcrumbs={breadcrumbs} />
      <div className="container py-14">
        <div className="flex flex-col items-center p-4  text-black ">
          <div className="max-w-6xl w-full  rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
            <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
              <ProductSlider imageUrls={imageUrl} />
              <div className="flex flex-col justify-between pl-4">
                <div className="text-gray-900 mb-4">
                  <h2 className="text-2xl font-bold  mb-2">{name}</h2>
                  <p className="mb-2">
                    <span className="font-semibold text-[15px] text-[#474747]">
                      Description: {description}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold text-[20px]">
                      Price: $ {price}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-[13px] text-[#474747]">
                      Category: {category?.name}
                    </span>
                  </p>
                  <div className="mb-2 flex items-center">
                    <span className="font-semibold text-[13px] text-[#474747]">
                      Customer reviews:
                    </span>
                    <div className="ml-2 flex">
                      {/* @ts-expect-error there is no type declaration file for react rating */}
                      <Rating
                        placeholderRating={ratings}
                        readonly
                        emptySymbol={<Star size={13} color="orange" />}
                        placeholderSymbol={
                          <Star size={13} color="orange" fill="orange" />
                        }
                        fullSymbol={
                          <Star size={13} color="orange" fill="orange" />
                        }
                      />
                    </div>
                  </div>
                  <p className="bg-[#EBF4E4] px-[12px] py-[5px] inline-block rounded text-[#1b352c] font-bold">
                    {stock <= 0 && "Out of Stock"}
                    {stock > 0 && `In Stock (${stock})`}
                  </p>
                  <div className="flex space-x-4 mb-4 mt-3 flex-wrap">
                    {featured && (
                      <p className="bg-[#ff9d707a] px-[12px] py-[5px] inline-block rounded text-[#1b352c] font-bold">
                        Featured
                      </p>
                    )}
                    {recommended && (
                      <p className="bg-[#EBF4E4] px-[12px] py-[5px] inline-block rounded text-[#1b352c] font-bold">
                        Recommended
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-justify mb-4">{data?.description}</p>
                <div className="flex  mb-4 flex-wrap gap-2">
                  <Button
                    onClick={handleAddToCart}
                    disabled={
                      stock === 0 || (cartItem && cartItem.quantity >= stock)
                    }
                    className="px-4 py-2 bg-[#ff8851] text-gray-900 rounded-lg font-bold flex items-center hover:text-[#fff] hover:bg-[#1b352c]"
                  >
                    <ShoppingCart className="mr-2" /> Add to Cart
                  </Button>
                  <Button
                    onClick={handleAddToWishlist}
                    className="px-4 py-2 bg-[#1b352c] text-gray-200 rounded-lg font-bold flex items-center hover:bg-[#ff8851] hover:text-gray-900"
                  >
                    <Heart className="mr-2" />{" "}
                    {wishListItems.length > 0
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
