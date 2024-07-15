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

const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const wishList = useSelector((state: RootState) => state.cart.wishList);

  return (
    <div className="mx-auto container  shrink-0">
      <div className="flex  items-center justify-between border-b-2 h-16 ">
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
                <Link to="/checkout">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Chekout
                  </NavigationMenuLink>
                </Link>
                <Link to="/productmanagement">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Product Management
                  </NavigationMenuLink>
                </Link>
                <Link to="/cart">
                  <NavigationMenuLink className="group mr-3 inline-flex relative top-2 h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <ShoppingCart className="cursor-pointer w-5" />
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <WishListDropdown />
                  <span className="ml-1">({wishList.length})</span>
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
