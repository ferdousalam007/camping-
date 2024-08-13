import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, Star } from "lucide-react";
import Rating from "react-rating";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  id: string;
  stock: number;
  recommended?: boolean;
  featured?: boolean;
  price: number;
  totalSold: number;  
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  rating,
  id,
  stock,
  recommended,
  featured,
  price,
  totalSold,
}) => {
  return (
    <div>
      <Card className="relative flex flex-col h-full">
        {/* <CardHeader className="flex justify-between items-center p-4">
         
        </CardHeader> */}
        <CardContent className="flex flex-col items-center px-3 py-4">
          {recommended && (
            <p className="absolute top-[15px] right-[12px] bg-[#ff8851] px-2 py-1 text-white text-xs tracking-wider rounded">
              {recommended && "Recommended"}
            </p>
          )}
          {featured && (
            <p className="absolute top-[15px] left-[12px] bg-[#ff8851] px-2 py-1 text-white text-xs tracking-wider rounded">
              {featured && "Featured"}
            </p>
          )}

          <img
            src={image}
            alt={title}
            className="h-[150px] w-full object-cover"
          />
          <h3 className="mt-4 text-center text-base font-medium text-[#22262A]">
            {title}
          </h3>
          {/* <h4 className="text-base font-normal">{description}</h4> */}
          <h4 className="text-sm font-medium text-center mt-2">
            {description?.length > 60
              ? description.substring(0, 60) + "..."
              : description}
          </h4>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-base text-muted-foreground">
              rating:
            </span>
            {/* @ts-expect-error their is no type declaration file for react rating*/}
            <Rating
              placeholderRating={rating}
              readonly
              emptySymbol={<Star size={15} color="orange" />}
              placeholderSymbol={
                <Star size={15} color="orange" fill="orange" />
              }
              fullSymbol={<Star size={15} color="orange" fill="orange" />}
            />
          </div>
          <div className="mt-4 text-[18px] font-medium text-[#22262A]">
            $ {price}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-red-500 font-semibold">{totalSold} Sold</span>
            <span className="ml-4 text-green-500 font-semibold">
              {stock > 1 ? `${stock} In Stock ` : "Out of stock"}
              {/* {stock === 0 && <span className="ml-4 text-red-500 font-semibold">Out of stock</span>} */}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-auto p-4">
          <Button className="">
            <ShoppingCartIcon className="w-5 h-5 mr-2 text-gray-100" />
            <Link to={`/products/${id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
