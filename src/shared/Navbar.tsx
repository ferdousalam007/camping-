
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mx-auto container  shrink-0">
      <div className="flex  items-center justify-between border-b-2 py-3 ">
        <Link to="/" className="flex items-center">
          <h3 className="font-extrabold bg-yellow-400 p-1 rounded-md">
            CineScope{" "}
          </h3>{" "}
          <Clapperboard className="mx-3 " />
        </Link>
        <NavigationMenu className="">
          <NavigationMenuList>
            <div className="flex justify-end">
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
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
