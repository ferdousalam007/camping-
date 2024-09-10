
import ProductCard from "@/components/productCard/ProductCard";
import { useGetProductsWithoutQueryQuery } from "@/redux/api/baseApi";
import LeftTitle from "@/components/LeftTitle";
const RecommendedProduct = () => {
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsWithoutQueryQuery("");
  const products = productsData?.data;

  // Filter the products to only include recommended ones
  const recommendedProducts = products
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.filter((product: any) => product?.recommended && !product?.isDeleted)
    .slice(-4).reverse(); 


  if (isProductsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container py-12 mt-5">
        <LeftTitle firstTitle="Recommended" secondTitle="Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-hidden"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recommendedProducts?.map((product: any) => (
              <ProductCard
                key={product?._id}
                image={product?.imageUrl ? `${product.imageUrl[0]}` : ""}
                title={`${product?.name}`}
                description={`${product?.description}`}
                rating={parseFloat(product?.ratings)}
                stock={product?.stock}
                id={product?._id}
                recommended
                price={product?.price}
                totalSold={product?.totalSold}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;
