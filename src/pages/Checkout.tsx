import React, { useState } from "react";
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
import { useGetAllProductsQuery } from "@/redux/api/baseApi";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const { data: productsData } = useGetAllProductsQuery("");
  const products = productsData?.data.result;

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      userDetails,
      cartItems,
      totalPrice,
    };

    if (paymentMethod === "cash") {
      // Deduct stock and redirect to success page
      cartItems.forEach((item) => {
        const product = products.find((p: any) => p._id === item.id);
        if (product) {
          dispatch(decreaseQuantity(item.id));
        }
      });
      dispatch(clearCart());
      navigate("/success", { state: orderDetails });
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
    const product = products.find((p: any) => p._id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <Input
            type="tel"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <Input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            required
          />
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
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </form>

      <h2 className="text-xl font-bold mt-8">Cart Items</h2>
      <ul>
        {cartItems.map((item) => {
          const product = products.find((p: any) => p._id === item.id);

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
                disabled={item.quantity >= product.stock}
              >
                +
              </button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <h2>Total: ${totalPrice}</h2>
    </div>
  );
};

export default Checkout;
