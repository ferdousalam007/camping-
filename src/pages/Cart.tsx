/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { Button } from "@/components/ui/button";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const { data, isLoading } = useGetAllProductsQuery("");

  const products = data?.data.result;
  console.log(cartItems);
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
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.items?.map((item) => {
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
      <h2>Total: ${totalPrice}?</h2>
      <Link to="/checkout">
        <Button>Place Order</Button>
      </Link>
    </div>
  );
};

export default Cart;
