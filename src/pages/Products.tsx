import SectionHeading from "@/components/SectionHeading";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import { Product } from "@type/type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/productCard/ProductCard";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sort, setSort] = useState<"asc" | "desc" | undefined>();
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
  const { data: products,isLoading, refetch } = useGetProductsQuery({
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  });
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
    console.log(isCategoriesLoading);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newResult: any = products?.data || [];
  console.log(newResult)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newProducts: Product[] = newResult?.result || [];
console.log(newProducts)
  const handleClear = () => {
    setSearch("");
    setCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSort(undefined);
    refetch();
    setPage(1);
  };
    const handleNextPage = () => {
      setPage((prev) => prev + 1);
      refetch();
    };

    const handlePreviousPage = () => {
      if (page > 1) {
        setPage((prev) => prev - 1);
        refetch();
      }
    };

    const handlePageChange = (pageNumber: number) => {
      setPage(pageNumber);
      refetch();
    };
const totalPages = Math.ceil(newProducts.length / limit);
  return (
    <div className="container">
      <div className="py-12">
        <SectionHeading
          headingText="Products"
          paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
        />
      </div>
      <div>
        <Input
          type="test"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories?.data.map((category: { _id: string; name: string }) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice ?? ""}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice ?? ""}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={handleClear}>Clear</button>

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              newProducts?.map((product: any) => (
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
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={products && page * limit >= products.total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
