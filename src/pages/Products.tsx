import SectionHeading from "@/components/SectionHeading";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import { Product } from "@type/type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/productCard/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ApiResponse {
  page: number;
  limit: number;
  total: number;
  result: Product[];
}

const Products = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sort, setSort] = useState<"asc" | "desc" | undefined>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery<ApiResponse>({
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  });

  const apiLimit = products?.data?.limit; //this is api response limit
  const apiTotal = products?.data?.total;
  const newResult: any = products?.data || [];
  const newProducts: Product[] = newResult?.result || [];
  const totalPages = Math.ceil(apiTotal / apiLimit);

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSort(undefined);
    setPage(1);
    setLimit(10); // Resetting limit to its initial value
    refetch();
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    refetch();
  };

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
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories?.data?.map((cat: { _id: string; name: string }) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice ?? ""}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <Input
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

        {/* Limit adjustment input */}
        <div>
          <label htmlFor="productsPerPage">Products per Page:</label>
          <input
            id="productsPerPage"
            type="number"
            defaultValue={limit}
            onChange={(e) => {
              const newLimit = parseInt(e.target.value, 10);
              if (!isNaN(newLimit)) {
                setLimit(newLimit);
                // Optionally, trigger a re-fetch of products here if needed
              }
            }}
          />
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong. Please try again later.</p>}

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {newProducts.map((product: Product) => (
              <ProductCard
                key={product._id}
                image={product.imageUrl}
                title={product.name}
                description={product.description}
                rating={parseFloat(product.ratings)}
                id={product._id}
                stock={product.stock}
              />
            ))}
          </div>
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page === 1 ? (
              "Previous"
            ) : (
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(page - 1)}
              />
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                href="#"
                isActive={page === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {page === totalPages ? (
              "Next"
            ) : (
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(page + 1)}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;
