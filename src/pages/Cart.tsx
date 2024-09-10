/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsWithoutQueryQuery } from "@/redux/api/baseApi";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { toast } from "sonner";

const breadcrumbs = [{ label: "Home", href: "/" }, { label: `Cart` }];

const Cart = () => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const { data, isLoading } = useGetProductsWithoutQueryQuery("");
  const products = data?.data;
console.log(data?.data);
console.log(data);
  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
      toast.success("Item removed from cart", { duration: 2000 });
      setItemToRemove(null);
    }
    setShowRemoveModal(false);
  };

  const handleRemove = (id: string) => {
    setItemToRemove(id);
    setShowRemoveModal(true); // Show the remove item modal
  };

  const handleConfirmClearCart = () => {
    dispatch(clearCart());
    setShowClearCartModal(false);
    toast.success("Cart cleared!", { duration: 2000 });
  };

  const handleClearCart = () => {
    setShowClearCartModal(true); // Show the clear cart modal
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
    toast.success("Quantity increased", { duration: 2000 });
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
    toast.success("Quantity decreased", { duration: 2000 });
  };

  const totalPrice = cartItems.items?.reduce((total: any, item: any) => {
    const product = products?.find((p: any) => p._id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="">
      <PageTitle title="Cart" breadcrumbs={breadcrumbs} />

      <div className="container py-8">
        {cartItems.items?.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-[#1b352c#]">
                    Product
                  </TableHead>
                  <TableHead className="font-bold text-[#1b352c#]">
                    Price
                  </TableHead>
                  <TableHead className="font-bold text-[#1b352c#]">
                    Quantity
                  </TableHead>
                  <TableHead className="text-right font-bold text-[#1b352c#]">
                    Total
                  </TableHead>
                  <TableHead className="text-right font-bold text-[#1b352c#]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.items?.map((item: any) => {
                  const product = products?.find((p: any) => p._id === item.id);

                  if (!product) return "No product found";
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium flex gap-1 flex-wrap align-middle">
                        <img
                          className="w-[40px] h-[40px] object-cover"
                          src={
                            product?.imageUrl ? `${product.imageUrl[0]}` : ""
                          }
                          alt={product.name}
                        />
                        {product.name}
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right font-bold text-[#1b352c] ">
                        ${(product.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          disabled={item.quantity <= 1}
                          className={`mr-2 py-1 px-2 rounded font-bold cursor-pointer ${
                            item.quantity <= 1
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-[#1b352c] text-white hover:bg-[#ff8851]"
                          }`}
                        >
                          -
                        </button>

                        <button
                          onClick={() => handleIncrease(item.id)}
                          disabled={item.quantity >= product.stock}
                          className={`mr-2 py-1 px-2 rounded font-bold cursor-pointer ${
                            item.quantity >= product.stock
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-[#1b352c] text-white hover:bg-[#ff8851]"
                          }`}
                        >
                          +
                        </button>

                        <button
                          className="py-1 px-2 mt-1 sm:mt-0 rounded bg-[#1b352c] text-white hover:bg-[#ff8851] font-medium"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell
                    className="font-bold text-[#1b352c] text-xl"
                    // colSpan={}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    className="text-right font-bold text-[#1b352c] text-xl"
                  >
                    $ {totalPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right ">
                    <Link to="/checkout">
                      <Button className="bg-[#ff8851] text-white hover:bg-[#1b352c]">
                        Place Order
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="flex space-x-4 mt-8">
              <Button
                onClick={handleClearCart}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Clear Cart
              </Button>
              <Link to="/products">
                <Button className="bg-[#ff8851] text-white hover:bg-[#1b352c]">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-44">
            <h1 className="text-3xl font-bold mb-4">Cart is empty</h1>
            <Link to="/products">
              <Button className="bg-[#ff8851] text-white hover:bg-[#1b352c]">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Modal for removing an item */}
      {showRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to remove this item?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for clearing the cart */}
      {showClearCartModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to clear your cart?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowClearCartModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearCart}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
