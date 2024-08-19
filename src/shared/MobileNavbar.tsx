import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Tent } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const location = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer text-white" />
      </SheetTrigger>
      <SheetContent className="bg-slate-900">
        <SheetHeader>
          <SheetTitle>
            <Link to="/" className="flex items-center">
              <Tent className="bg-white" />
              <h3 className="font-medium text-2xl text-white p-1 rounded-md">
                Camping Shop
              </h3>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className=" py-4">
          <Link
            to="/"
            className={` ${location.pathname === "/" ? "bg-gray-800" : ""}
            block px-4 py-2 rounded-md text-white`}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className={` ${
              location.pathname === "/aboutus" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white`}
          >
            Aboutus
          </Link>
          <Link
            to="/products"
            className={` ${
              location.pathname === "/products" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white`}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={` ${location.pathname === "/cart" ? "bg-gray-800" : ""}
            block px-4 py-2 rounded-md text-white`}
          >
            Cart
          </Link>
          <Link
            to="/checkout"
            className={` ${
              location.pathname === "/checkout" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white`}
          >
            Chekout
          </Link>
          <Link
            to="/productmanagement"
            className={` ${
              location.pathname === "/productmanagement" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white`}
          >
            Product Management
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
