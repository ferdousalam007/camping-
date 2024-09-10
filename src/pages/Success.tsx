/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllproductQuery } from "@/redux/api/baseApi";
import { useLocation } from "react-router-dom";
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

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  id: string;
  quantity: number;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface LocationState {
  userDetails: UserDetails;
  cartItems: CartItem[];
  totalPrice: number;
}

const Success = () => {
  const location = useLocation();
  const { userDetails, cartItems, totalPrice } =
    (location.state as LocationState) || {};

  const { data: productsData } = useGetAllproductQuery("");
  const products: Product[] | undefined = productsData?.data.result;

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart</div>;
  }
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: `Products`, href: "/products" },
  { label: `Success` },
];
  return (
    <div>
      <PageTitle title="Success" breadcrumbs={breadcrumbs} />
      <div className="container py-12">
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        <p>
          Thank you for your order. Your order has been placed successfully.
        </p>

        <h2 className="text-2xl font-bold mt-8">Customer Information</h2>
        <p className="text-base font-bold mt-3">Name: {userDetails?.name}</p>
        <p className="text-base font-bold">Email: {userDetails?.email}</p>
        <p className="text-base font-bold">Phone: {userDetails?.phone}</p>
        <p className="text-base font-bold">Address: {userDetails?.address}</p>
        <h2 className="text-xl font-bold mt-8">
          Payment Method : Cash on Delivery
        </h2>
        <h2 className="text-2xl font-bold mt-8 mb-4">Order Details :</h2>

        <Table>
          <TableHeader>
            <TableRow className="bg-[#1b352c] hover:bg-[#1b352c] hover:opacity-100 ">
              <TableHead className="text-white">Product</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">Quantity</TableHead>
              <TableHead className="text-white">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => {
              const product = products?.find((p) => p._id === item.id);

              if (!product) return null;

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex gap-1 flex-wrap align-middle">
                    <img
                      className="w-[40px] h-[40px] object-cover"
                      src={product?.imageUrl ? `${product.imageUrl[0]}` : ""}
                      alt={product.name}
                    />
                    {product.name}
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    ${(product.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total Price:
              </TableCell>
              <TableCell className="font-bold">
                ${totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Success;
