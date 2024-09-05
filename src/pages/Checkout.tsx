import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
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
    setItemToRemove(id);
    setShowRemoveItemModal(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
      toast.success("Item removed from cart", { duration: 2000 });
      setItemToRemove(null);
    }
    setShowRemoveItemModal(false);
  };

  const handleClearCart = () => {
    setShowClearCartModal(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowClearCartModal(false);
    toast.success("Cart cleared!", { duration: 2000 });
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products?.find((p: Product) => p._id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

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

            <div className="">
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
                        <TableCell className="font-bold">
                          {product.name}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{item.quantity}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-[#1b352c] ">
                          ${(product.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            disabled={item.quantity <= 1}
                            className={`mr-2 py-1 px-2 rounded font-bold cursor-pointer ${
                              item.quantity <= 1
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-[#1b352c] text-white hover:bg-[#ff8851]"
                            }`}
                          >
                            -
                          </Button>

                          <Button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            disabled={item.quantity >= (product?.stock || 0)}
                            className={`mr-2 py-1 px-2 rounded font-bold cursor-pointer ${
                              item.quantity >= (product?.stock || 0)
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-[#1b352c] text-white hover:bg-[#ff8851]"
                            }`}
                          >
                            +
                          </Button>
                          <Button
                            onClick={() => handleRemove(item.id)}
                            className="py-1 px-2 rounded bg-[#1b352c] text-white hover:bg-[#ff8851] font-medium"
                          >
                            Remove
                          </Button>
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
                   
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

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
        )}
      </div>

      {/* Remove Item Modal */}
      {showRemoveItemModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Remove Item</h3>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className="flex space-x-4 mt-4">
              <Button
                onClick={handleConfirmRemove}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </Button>
              <Button onClick={() => setShowRemoveItemModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cart Modal */}
      {showClearCartModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Clear Cart</h3>
            <p>Are you sure you want to clear your cart?</p>
            <div className="flex space-x-4 mt-4">
              <Button
                onClick={confirmClearCart}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </Button>
              <Button onClick={() => setShowClearCartModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
