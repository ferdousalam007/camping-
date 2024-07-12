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

const ProductCard = () => {
  return (
    <div>
      <Card className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Link to={`/`}>
             {/* <Link to={`/movie/$movie?.slug`}></Link> */}
          <CardHeader className="p-2">
            <img
              src="movie?.image"
              className="h-[400px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
              alt="movie?.title"
            />
          </CardHeader>
          <CardContent className="grid p-4">
            <div className="flex items-center gap-2">
              <Star color="orange" fill="orange" />
              <p className="text-2xl font-bold">movie?.totalRating</p>
            </div>
            <CardTitle className="mt-2 text-3xl font-extrabold">
              movie?.title
            </CardTitle>
            <p className="text-lg mt-4 text-gray-400">"movie?.genre"</p>
          </CardContent>
        </Link>
        <CardFooter>
          {/* @ts-expect-error their is no type declaration file for react rating*/}
          <Rating
            placeholderRating={2.5}
            readonly
            emptySymbol={<Star size={40} color="orange" />}
            placeholderSymbol={<Star size={40} color="orange" fill="orange" />}
            fullSymbol={<Star size={40} color="orange" fill="orange" />}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
