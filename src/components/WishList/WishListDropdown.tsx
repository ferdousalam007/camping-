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
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingBasket, Trash2 } from "lucide-react";
import { Drawer } from "vaul";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import {
  closeModal,
  removeFromWishList,
  transferToCart,
} from "@/redux/slice/cartSlice";
import Modal from "@/components/Modal";
// type Props = {
//   openWishList: boolean;
//   setOpenWishList: React.Dispatch<React.SetStateAction<boolean>>;
// };

const WishListDropdown = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllProductsQuery("");
  const wishlistItems = useSelector((state: any) => state.cart.wishList);
  const cartItems = useSelector((state: any) => state.cart.items);
  const modalMessage = useSelector((state: any) => state.cart.modalMessage);
  const products = data?.data.result;
  const handleTransferToCart = (itemId: string) => {
    console.log(itemId);
    dispatch(transferToCart(itemId));
  };
  const handleRemoveFromWishList = (itemId: string) => {
    dispatch(removeFromWishList(itemId));
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  console.log(wishlistItems);
  console.log(cartItems);
  console.log(products);
  return (
    <div>
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
                    <TableCaption>{`Total: ${wishlistItems.length} Item`}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Remove</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {wishlistItems.map((item: any) => {
                        const product = products.find(
                          (p: any) => p._id === item.id
                        );
                        if (!product) return "No product found";
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="text-green-600 font-medium">
                              {" "}
                              {`${product.name}`}
                            </TableCell>
                            <TableCell className="text-green-600 font-medium">
                              {" "}
                              {`$${product.price}`}
                            </TableCell>
                            <TableCell className="text-red-600 font-medium ">
                              <button
                                onClick={() =>
                                  handleTransferToCart(product._id)
                                }
                              >
                                <ShoppingBasket color="#0bf43a" />
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveFromWishList(product._id)
                                }
                              >
                                <Trash2 color="#ff2e2e" />
                              </button>
                            </TableCell>
                            <Modal
                              id={product._id}
                              isOpen={!!modalMessage}
                              onClose={handleCloseModal}
                              message={modalMessage || ""}
                            />
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </p>
                <p className="text-zinc-600 mb-8 mt-8">
                  <DrawerFooter>
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
