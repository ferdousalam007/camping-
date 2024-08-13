import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Product } from "@type/type";

const userDetailsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type UserDetails = z.infer<typeof userDetailsSchema>;

const Checkout = () => {
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
      // Deduct stock and redirect to success page
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

          dispatch(clearCart());
        });
      } catch (error) {
        console.error("Error placing order:", error);
        // Handle error appropriately (e.g., display an error message)
      }
    } else if (paymentMethod === "stripe") {
      // Redirect to Stripe payment page
      // After successful payment, deduct stock and redirect to success page
      // This part requires integration with Stripe API
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products?.find((p: Product) => p._id === item.id);
    return total + (product ? product?.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form className="space-y-4" onSubmit={handleSubmit(handlePlaceOrder)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              Stripe
            </label>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          Place Order
        </Button>
      </form>

      <h2 className="text-xl font-bold mt-8">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>You have no products added to your cart.</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            const product = products?.find((p: Product) => p._id === item.id);

            if (!product) return "No product found";
            return (
              <li key={item.id}>
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() => handleDecrease(item.id)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => handleIncrease(item.id)}
                  disabled={item.quantity >= (product?.stock || 0)}
                >
                  +
                </button>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
      {cartItems.length > 0 && <h2>Total: ${totalPrice}</h2>}
    </div>
  );
};

export default Checkout;
