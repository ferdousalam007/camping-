
import ProductCard from "@/components/productCard/ProductCard";
import { useGetAllproductQuery } from "@/redux/api/baseApi";
import LeftTitle from "@/components/LeftTitle";

const FeaturedProducts = () => {
 const { data: productsData, isLoading: isProductsLoading } =
   useGetAllproductQuery("");
 const products = productsData?.data.result;

 // Filter the products to only include recommended ones
 const featuredProducts = products
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   ?.filter((product: any) => product?.featured && !product?.isDeleted)
   .slice(-4);

  
 if (isProductsLoading) {
   return <div>Loading...</div>;
 }

  return (
    <div className="container py-12">
      <LeftTitle firstTitle="Featured" secondTitle="Products" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          featuredProducts?.map((product: any) => (
            <ProductCard
              key={product?._id}
              image={`${product?.imageUrl[0]}`}
              title={`${product?.name}`}
              description={`${product?.description}`}
              rating={parseFloat(product?.ratings)}
              stock={product?.stock}
              id={product?._id}
              featured
              price={product?.price}
              totalSold={product?.totalSold}
            />
          ))
        }
      </div>
    </div>
  );
};

export default FeaturedProducts;
