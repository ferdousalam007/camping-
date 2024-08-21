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

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface WishListItem {
  id: number;
  name: string;
}
interface MobileNavbarProps {
  cart: CartState;
  wishList: WishListItem[];
}

const MobileNavbar = ({ cart, wishList }: MobileNavbarProps) => {
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
            to="/productmanagement"
            className={` ${
              location.pathname === "/productmanagement" ? "bg-gray-800" : ""
            }
            block px-4 py-2 rounded-md text-white`}
          >
            Product Management
          </Link>
          <Link to="/cart">
            <NavigationMenuLink className="group mr-3 inline-flex relative top-2 h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-[#ff8851]">
              <ShoppingCart className="cursor-pointer w-5 text-white " />
              {cart.items.length > 0 && (
                <span className="ml-1 absolute right-[-10px] top-[-10px] bg-blue-600 text-white px-1 rounded px-2">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </NavigationMenuLink>
          </Link>
          <NavigationMenuLink className="group mr-3 inline-flex relative top-2 h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-[#ff8851]">
            <WishListDropdown />
            <span className="ml-1 absolute right-[-10px] top-[-10px] bg-blue-600 text-white px-1 rounded px-2">
              {wishList.length > 0 && wishList.length}
            </span>
          </NavigationMenuLink>
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
