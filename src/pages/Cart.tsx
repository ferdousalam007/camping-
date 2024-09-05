import { useGetAllproductQuery } from "@/redux/api/baseApi";
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
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null); // Track the item to remove
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const { data, isLoading } = useGetAllproductQuery("");

  const products = data?.data.result;

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
      toast.success("Item removed from cart", { duration: 2000 });
      setItemToRemove(null); // Clear the item to remove
    }
    setShowModal(false);
  };

  const handleRemove = (id: string) => {
    setItemToRemove(id); // Set the item to remove
    setShowModal(true); // Show the modal
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
    toast.success("Quantity increased", { duration: 2000 });
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
    toast.success("Quantity decreased", { duration: 2000 });
  };

  const handleClearCart = () => {
    setShowModal(true);
  };

  const totalPrice = cartItems.items?.reduce((total: any, item: any) => {
    const product = products.find((p: any) => p._id === item.id);
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
                  const product = products.find((p: any) => p._id === item.id);

                  if (!product) return "No product found";
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
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
                          className="py-1 px-2 rounded bg-[#1b352c] text-white hover:bg-[#ff8851] font-medium"
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
                    colSpan={3}
                  >
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#1b352c] text-xl">
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
            <Button
              className="bg-red-500 text-white hover:bg-red-700 mr-2 block mx-auto"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {itemToRemove
                ? "Are you sure you want to remove this item?"
                : "Are you sure you want to clear your cart?"}
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={
                  itemToRemove
                    ? handleConfirmRemove
                    : () => {
                        dispatch(clearCart());
                        setShowModal(false);
                        toast.success("Cart cleared!", { duration: 2000 });
                      }
                }
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {itemToRemove ? "Remove Item" : "Clear Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
