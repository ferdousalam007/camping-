import SectionHeading from '@/components/SectionHeading';
import ProductCard from '@/components/productCard/ProductCard';
import { useGetAllProductsQuery } from '@/redux/api/baseApi';


const RecommendedProduct = () => {
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery("");
    console.log(products?.data)
  return (
    <div className="container py-24">
      <SectionHeading
        headingText="Recommended Products"
        paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          products?.data.map((product: any) => (
            <ProductCard
              key={product?._id}
              image={`${product?.imageUrl}`}
              title={`${product?.name}`}
              description={`${product?.description}`}
              rating={parseFloat(product?.ratings)}
              id={product?._id}
            />
          ))
        }
      </div>
    </div>
  );
}

export default RecommendedProduct

