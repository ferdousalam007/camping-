import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  toast } from "sonner";
import {
  decreaseQuantity,
  removeFromCart,
  increaseQuantity,
  clearCart,
} from "@/redux/slice/cartSlice";
import {
  useGetAllproductQuery,
  useCreateOrderMutation,
} from "@/redux/api/baseApi";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "@/type/type";
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
import PageTitle from "@/components/PageTitle";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: `Cart`, href: "/cart" },
  { label: `Checkout` },
];

const userDetailsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^[0-9]{11}$/, { message: "Phone number must be 11 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type UserDetails = z.infer<typeof userDetailsSchema>;

const Checkout = () => {
    const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("cash");
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { data: productsData } = useGetAllproductQuery("");
  const products: Product[] | undefined = productsData?.data.result;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const handlePlaceOrder = async (data: UserDetails) => {
    const orderDetails = {
      ...data,
      cartItems,
      totalPrice,
    };
    if (paymentMethod === "cash") {
      cartItems.forEach((item) => {
        const product = products?.find((p: Product) => p._id === item.id);
        if (product) {
          dispatch(decreaseQuantity(item.id));
        }
      });

      try {
        await createOrder(orderDetails).then(() => {
          navigate("/success", {
            state: { ...orderDetails, userDetails: data },
          });
          toast.success("Order placed successfully", { duration: 2000 });
          dispatch(clearCart());
        });
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else if (paymentMethod === "stripe") {
      // Redirect to Stripe payment page
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart", { duration: 2000 });
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
    toast.success("Quantity increased", { duration: 2000 });
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
    toast.success("Quantity decreased", { duration: 2000 });
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products?.find((p: Product) => p._id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
 const handleClearCart = () => {
   setShowModal(true);
 };
  return (
    <div>
      <PageTitle title="Checkout" breadcrumbs={breadcrumbs} />
      <div className="container py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-44">
            <h1 className="text-3xl font-bold mb-4">Cart is empty</h1>
            <Link to="/products">
              <Button className="bg-[#ff8851] text-white hover:bg-[#1b352c]">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handlePlaceOrder)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    Cash on Delivery
                  </label>
                  {/* Removed hidden Stripe payment method for simplicity */}
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Placing Order..." : "Place Order"}
              </Button>
            </form>

            <h2 className="text-xl font-bold mt-8">Cart Items</h2>

            <div className="container">
              <Table>
                <TableCaption>A list of items in your cart.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-[#1b352c]">
                      Product
                    </TableHead>
                    <TableHead className="font-bold text-[#1b352c]">
                      Price
                    </TableHead>
                    <TableHead className="font-bold text-[#1b352c]">
                      Quantity
                    </TableHead>
                    <TableHead className="text-right font-bold text-[#1b352c]">
                      Total
                    </TableHead>
                    <TableHead className="text-right font-bold text-[#1b352c]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => {
                    const product = products?.find(
                      (p: Product) => p._id === item.id
                    );

                    if (!product)
                      return (
                        <TableRow key={item.id}>
                          <TableCell colSpan={5}>No product found</TableCell>
                        </TableRow>
                      );
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
                            disabled={item.quantity >= (product?.stock || 0)}
                            className={`mr-2 py-1 px-2 rounded font-bold cursor-pointer ${
                              item.quantity >= (product?.stock || 0)
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-[#1b352c] text-white hover:bg-[#ff8851]"
                            }`}
                          >
                            +
                          </button>

                          <button
                            onClick={() => handleRemove(item.id)}
                            className="py-1 px-2 rounded bg-[#1b352c] text-white hover:bg-[#ff8851] font-medium"
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
                      className="text-left text-lg font-bold"
                      colSpan={2}
                    >
                      Total
                    </TableCell>
                    <TableCell colSpan={3} className="text-right font-medium">
                      ${totalPrice.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-700  mx-auto"
                    onClick={handleClearCart}
                  >
                    Clear All Cart Items
                  </Button>
                </TableFooter>
              </Table>
            </div>
          </>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to clear your cart?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(clearCart());
                  setShowModal(false);
                  toast.success("Cart cleared!", { duration: 2000 });
                }}
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

export default Checkout;
