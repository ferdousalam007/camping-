import MainLayouts from "@/components/Layouts/MainLayouts";
import AboutUs from "@/pages/AboutUs";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Checkout from "@/pages/Checkout";
import Notfound from "@/pages/Notfound";
import ProductDetails from "@/pages/ProductDetails";
import ProductManagement from "@/pages/ProductManagement";
import Products from "@/pages/Products";
import { createBrowserRouter } from "react-router-dom";
import Success from "@/pages/Success";
import ScrollToTop from "./ScrollToTop";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop /> 
        <MainLayouts />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/productmanagement",
        element: <ProductManagement />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default router;
