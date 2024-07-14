/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Drawer } from "vaul";
import { useDispatch, useSelector } from "react-redux";
import { transferToCart } from "@/redux/slice/cartSlice";
// type Props = {
//   openWishList: boolean;
//   setOpenWishList: React.Dispatch<React.SetStateAction<boolean>>;
// };

const WishListDropdown = () => {
     const dispatch = useDispatch();
     const cartItems = useSelector((state:any) => state.cart.cartItems);
     const wishlistItems = useSelector((state: any) => state.cart.wishlistItems);
      const handleTransferToCart = (itemId: string) => {
        dispatch(transferToCart(itemId));
      };
      console.log(wishlistItems);
  return (
    <div>
      {/* <Drawer.Root direction="right">
        <DrawerTrigger>
          <Heart className="cursor-pointer w-5 " />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer.Root> */}
      <Drawer.Root direction="right">
        <Drawer.Trigger asChild>
          <Heart className="cursor-pointer w-5 " />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed z-30  inset-0 bg-black/40" />
          <Drawer.Content className="bg-white z-[99999999] flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
            <div className="p-4 bg-white flex-1 h-full ">
              <div className="max-w-md mx-auto ">
                <Drawer.Title className="font-medium mb-4 text-2xl">
                  All Your WishList
                </Drawer.Title>
                <p className="text-zinc-600 mb-2">
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        {/* {wishlistItems.map((item:any) => (
                          <li key={item.id}>
                            {`${item.name} - $${item.price}`}
                            <button
                              onClick={() => handleTransferToCart(item.id)}
                            >
                              Move to Cart
                            </button>
                          </li>
                        ))} */}
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </p>
                <p className="text-zinc-600 mb-8 mt-8">
                  <DrawerFooter>
                    <Button>Add to cart</Button>
                    <DrawerClose>
                      <Button
                        className="w-full bg-red-600 text-white"
                        variant="outline"
                      >
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default WishListDropdown;
