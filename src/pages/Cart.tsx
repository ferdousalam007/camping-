/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/api/baseApi";
import {

  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/slice/cartSlice";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  // console.log(Items.items);
  // const cartItems = Items.items;
  const { data, isLoading } = useGetAllProductsQuery("");
 
  const products = data?.data.result;
console.log(products);
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity(id));
  };
  console.log(cartItems.items);
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
        console.log(item.id);
          const product = products.find((p:any) => p._id === item.id);
          console.log(product);
          console.log(products);
          if (!product) return "fgfg";
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
      <button>Place Order</button>
    </div>
  );
};

export default Cart;
