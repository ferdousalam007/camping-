import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Link2 } from "lucide-react";

interface LeftTitleProps {
  firstTitle: string;
  secondTitle: string;
}

const LeftTitle = ({ firstTitle, secondTitle }: LeftTitleProps) => {
  return (
    <>
      <div className="flex justify-between md:items-center py-8 gap-3 flex-col md:flex-row">
        <div className="text-4xl  text-[#1b352c]">
          <h1>
            <span className="text-white px-2 font-medium  rounded mr-1 bg-[#1b352c] inline-block">
              {firstTitle}{" "}
            </span>
            <span className="text-[#ff702e] font-bold">{secondTitle}</span>
          </h1>
        </div>
        <Link to="/products">
          <Button className="bg-[#ff702e] hover:bg-[#1b352c] text-xl py-6 px-8 mt-4 md:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-external-link mr-1"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            All Products
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LeftTitle;
