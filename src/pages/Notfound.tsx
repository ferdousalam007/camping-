import { Button } from "@/components/ui/button";
import NotfoundImg from "../assets/404.png"
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <div
      className="bg-contain bg-center bg-red-500 bg-no-repeat min-h-[600px] w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${NotfoundImg})` }}
    >
      <div className="h-[200px] w-[200px] flex items-center justify-center rounded-full bg-[#6e2b1abb]">
        <Link to={"/"}>
          <Button className="mt-6 px-6 py-3 bg-[#ff8851] text-white rounded-full shadow-lg hover:bg-[#181c20] transition duration-300">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
