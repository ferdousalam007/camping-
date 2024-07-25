/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { userDetails, cartItems, totalPrice } = location.state || {};
const { data: productsData } = useGetAllProductsQuery("");
const products = productsData?.data.result;
 if (!cartItems) {
   return <div>No items in cart</div>;
 }
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
      <p>Thank you for your order. Your order has been placed successfully.</p>

      <h2 className="text-xl font-bold mt-8">Customer Information</h2>
      <p>Name: {userDetails.name}</p>
      <p>Email: {userDetails.email}</p>
      <p>Phone: {userDetails.phone}</p>
      <p>Address: {userDetails.address}</p>

      <h2 className="text-xl font-bold mt-8">Order Details</h2>
     
      <ul>
        {cartItems.map((item:any) => {
          const product = products.find((p: any) => p._id === item.id);

          if (!product) return "No product found";
          return (
            <li key={item.id}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${product.price * item.quantity}</p>
            </li>
          );
        })}
      </ul>
      {/* <h2>Total: ${totalPrice}</h2> */}
    </div>
  );
};

export default Success;
