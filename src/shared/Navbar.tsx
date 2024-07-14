import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RootState } from "@redux/store";
import { Heart, ShoppingCart, Tent } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
   const cart = useSelector((state: RootState) => state.cart);
  return (
    <div className="mx-auto container  shrink-0">
      <div className="flex  items-center justify-between border-b-2 py-3 ">
        <Link to="/" className="flex items-center">
          <Tent />
          <h3 className="font-extrabold bg-yellow-400 p-1 rounded-md">
            Camping Shop
          </h3>
        </Link>
        <NavigationMenu className="">
          <NavigationMenuList>
            <div className="flex justify-end items-center">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ShoppingCart className="cursor-pointer w-5" />
                  <span className="ml-1">
                    (
                    {cart.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                    )
                  </span>
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Heart className="cursor-pointer w-5 " />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
