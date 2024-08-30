/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DrawerClose,
 
  DrawerFooter,

} from "@/components/ui/drawer";
import { Toaster, toast } from "sonner";
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
import { useGetAllproductQuery } from "@/redux/api/baseApi";
import {

  closeModal,
  removeFromWishList,
  transferToCart,
} from "@/redux/slice/cartSlice";
import Modal from "@/components/Modal";
import { useState } from "react";

// Custom Modal Component (Modalw)
const Modalw = ({ isOpen, onClose, message }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Alert</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#ff8851]  text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const WishListDropdown = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllproductQuery("");
  const wishlistItems = useSelector((state: any) => state.cart.wishList);
  const modalMessage = useSelector((state: any) => state.cart.modalMessage);
  const products = data?.data.result;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModalMessage, setCustomModalMessage] = useState("");

  // const handleTransferToCart = (itemId: string) => {
  //   const product = products.find((p: any) => p._id === itemId);

  //   if (product) {
  //     if (product.stock === 0) {
  //       setCustomModalMessage("This product is out of stock.");
  //       setIsModalOpen(true);
  //       return;
  //     }
  //     dispatch(transferToCart(itemId));
  //   } else {
  //     setCustomModalMessage("Product not found.");
  //     setIsModalOpen(true);
  //   }
  // };

// const handleTransferToCart = (itemId: string) => {
//   const product = products.find((p: any) => p._id === itemId);

//   if (product) {
//     if (product.stock === 0) {
//       setCustomModalMessage("This product is out of stock.");
//       setIsModalOpen(true);
//       return;
//     }

//     const cartItem = wishlistItems.find((item: any) => item.id === itemId);
//     if (cartItem) {
//       setCustomModalMessage(
//         "This product is already in your cart. Please adjust the quantity in the cart."
//       );
//       setIsModalOpen(true);
//       return;
//     }

//     dispatch(transferToCart(itemId));

   
    
//   } else {
//     setCustomModalMessage("Product not found.");
//     setIsModalOpen(true);
//   }
// };

const handleTransferToCart = (itemId: string) => {
  const product = products.find((p: any) => p._id === itemId);

  if (product) {
    if (product.stock === 0) {
      setCustomModalMessage("This product is out of stock.");
      setIsModalOpen(true);
      return;
    }

    dispatch(transferToCart(itemId));
 // Display success toast
  } else {
    setCustomModalMessage("Product not found.");
    setIsModalOpen(true);
  }
};

  const handleRemoveFromWishList = (itemId: string) => {
    dispatch(removeFromWishList(itemId));
    toast.success("Item removed from wishlist!", { duration: 2000 });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomModalMessage("");
    dispatch(closeModal());
  };




  return (
    <div>
      <Toaster position="top-center" richColors />
      <Drawer.Root direction="right">
        <Drawer.Trigger asChild>
          <Heart className="cursor-pointer w-5 text-white " />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed z-30 inset-0 bg-black/40" />
          <Drawer.Content className="bg-white z-[99999999] flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
            <div className="p-4 bg-white flex-1 h-full">
              <div className="max-w-md mx-auto">
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
                            <TableCell className="text-[#1b352c] font-medium">
                              {`${product.name}`}
                            </TableCell>
                            <TableCell className="text-[#ff8851] font-medium">
                              {`$ ${product.price}`}
                            </TableCell>
                            <TableCell className="text-red-400 font-medium space-x-2">
                              <button
                                onClick={() =>
                                  handleTransferToCart(product._id)
                                }
                              >
                                <ShoppingBasket color="#1b352c" />
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveFromWishList(product._id)
                                }
                              >
                                <Trash2 color="#ff8851" />
                              </button>
                            </TableCell>
                            {/* Modal from Redux State */}
                            <Modal
                              id={product._id}
                              isOpen={!!modalMessage}
                              onClose={handleCloseModal}
                              message={modalMessage || ""}
                            />

                            {/* Custom Modal */}
                            <Modalw
                              isOpen={isModalOpen}
                              onClose={handleCloseModal}
                              message={customModalMessage}
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
                        className="w-full bg-[#ff8851] text-gray-900"
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
