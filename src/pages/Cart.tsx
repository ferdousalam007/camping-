/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllproductQuery } from "@/redux/api/baseApi";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { Button } from "@/components/ui/button";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter,
} from "@/components/ui/table";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const { data, isLoading } = useGetAllproductQuery("");

  const products = data?.data.result;

  if (!cartItems.items.length) {
    return <div>Cart is empty</div>;
  }

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const totalPrice = cartItems.items?.reduce((total, item) => {
    const product = products.find((p: any) => p._id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="mt-20">
      <h1>Cart</h1>
      <div className="container">
        <Table>
          <TableCaption>A list of items in your cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-[#1b352c#]">
                Product
              </TableHead>
              <TableHead className="font-bold text-[#1b352c#]">Price</TableHead>
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
            {cartItems.items?.map((item) => {
              const product = products.find((p: any) => p._id === item.id);

              if (!product) return "No product found";
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
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
      </div>
    </div>
  );
};

export default Cart;
