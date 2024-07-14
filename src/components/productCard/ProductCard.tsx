import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import Rating from "react-rating";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  rating,
  id,
}) => {
  return (
    <div>
      <Card className="bg-gray-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Link to={`/`}>
          <CardHeader className="p-2">
            <img
              src={image}
              className="h-[200px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
              alt={title}
            />
          </CardHeader>
          <CardContent className="grid p-4">
            <CardTitle className="mt-2 text-2xl font-semibold">
              {title}
            </CardTitle>
            <p className="text-lg mt-4 text-gray-400">{description}</p>
          </CardContent>
        </Link>
        <CardFooter>
          <p className="text-lg mt-4 text-gray-400">{rating}</p>
          {/* @ts-expect-error their is no type declaration file for react rating*/}
          <Rating
            placeholderRating={2.5}
            readonly
            emptySymbol={<Star size={15} color="orange" />}
            placeholderSymbol={<Star size={15} color="orange" fill="orange" />}
            fullSymbol={<Star size={15} color="orange" fill="orange" />}
          />
          <Button className="mt-4">
            <Link to={`/products/${id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
