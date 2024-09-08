import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { AlignJustify, ShoppingCart, Tent } from "lucide-react";
import { Link, useLocation } from "react-router-dom";



import WishListDropdown from "@/components/WishList/WishListDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

 
const MobileNavbar = () => {
   const [isOpen, setIsOpen] = useState(false); 
   const handleLinkClick = () => {
     setIsOpen(false);
   };
    const cart = useSelector((state: RootState) => state.cart);
    const wishList = useSelector((state: RootState) => state.cart.wishList);
  const location = useLocation();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer text-white inline-block lg:hidden" />
      </SheetTrigger>
      <SheetContent className="bg-slate-900">
        <SheetHeader>
          <SheetTitle>
            <Link to="/" className="flex items-center justify-center">
              <Tent className="bg-white" />
              <h3 className="font-medium text-2xl text-white p-1 rounded-md">
                Camping Shop
              </h3>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className=" py-4">
          <Link
            onClick={handleLinkClick}
            to="/"
            className={` ${location.pathname === "/" ? "bg-gray-800" : ""}
            block px-4 py-2 rounded-md text-white text-center`}
          >
            Home
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/aboutus"
            className={` ${
              location.pathname === "/aboutus" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white text-center`}
          >
            Aboutus
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/products"
            className={` ${
              location.pathname === "/products" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white text-center`}
          >
            Products
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/cart"
            className={` ${location.pathname === "/cart" ? "bg-gray-800" : ""}
            block px-4 py-2 rounded-md text-white text-center`}
          >
            Cart
          </Link>
          <Link
            onClick={handleLinkClick}
            to="/productmanagement"
            className={` ${
              location.pathname === "/productmanagement" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white text-center`}
          >
            Product Management
          </Link>
          <div className="flex justify-center items-center mt-3">
            <Link onClick={handleLinkClick} to="/cart">
              <NavigationMenuLink className="group mr-3 inline-flex relative top-2 h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-[#ff8953]">
                <ShoppingCart className="cursor-pointer w-5 text-white" />
                {cart.items.length > 0 && (
                  <span className="ml-1 absolute right-[-10px] top-[-10px] bg-[#fa8650] text-white  rounded px-2">
                    {cart.items.reduce(
                      (total: number, item: (typeof cart.items)[number]) =>
                        total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </NavigationMenuLink>
            </Link>
            <NavigationMenuLink className="group mr-3 inline-flex relative top-2 h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-[#ff8b55]">
              <WishListDropdown />
              <span className="ml-1 absolute right-[-10px] top-[-10px] bg-[#fa8650] text-white px-1 rounded px-2">
                {wishList.length > 0 && wishList.length}
              </span>
            </NavigationMenuLink>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full bg-[#ff8851]" type="submit">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
