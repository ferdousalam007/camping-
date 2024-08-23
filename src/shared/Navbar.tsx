import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import WishListDropdown from "@/components/WishList/WishListDropdown";
import { RootState } from "@redux/store";
import { Heart, ShoppingCart, Tent } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const wishList = useSelector((state: RootState) => state.cart.wishList);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`mx-auto bg-[#1b352c] w-full shrink-0 transition-all duration-500 ease-in-out border-b border-gray-100  ${
        isFixed
          ? "fixed top-0 z-10 "
          : "top-[-1000px] fixed  z-10 transition-all duration-500 ease-in-out"
      }`}
    >
      <div className={`container flex items-center justify-between  h-16  `}>
        <Link to="/" className="flex items-center">
          <Tent className="bg-white" />
          <h3 className="font-medium text-2xl text-white p-1 rounded-md">
            Camping Shop
          </h3>
        </Link>
        <NavigationMenu className="">
          <NavigationMenuList>
            <div className="lg:flex justify-end items-center hidden ">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
                <Link to="/aboutus">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Aboutus
                  </NavigationMenuLink>
                </Link>
                <Link to="/products">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Products
                  </NavigationMenuLink>
                </Link>
                <Link to="/cart">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Cart
                  </NavigationMenuLink>
                </Link>
                <Link to="/productmanagement">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Product Management
                  </NavigationMenuLink>
                </Link>
                <Link to="/cart">
                  <NavigationMenuLink className="group mr-3 inline-flex relative top-2 h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-[#ff8851]">
                    <ShoppingCart className="cursor-pointer w-5 text-white " />
                    {cart.items.length > 0 && (
                      <span className="ml-1 absolute right-[-10px] top-[-10px] bg-blue-600 text-white px-1 rounded px-2">
                        {cart.items.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
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
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
          <MobileNavbar clssasName="cursor-pointer" cart={cart} wishList={wishList} />
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
