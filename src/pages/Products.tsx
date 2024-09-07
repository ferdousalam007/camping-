/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import { Product, TApiResponse } from "@/type/type";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/productCard/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: `products` },
];
// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all"; // Default to "all" if no category is selected
  const [category, setCategory] = useState(categoryFromUrl);
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const debouncedSearch = useDebounce(search, 1000); // 1 second debounce

  // Fetch products based on search, category, price, etc.
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery<TApiResponse>({
    search: debouncedSearch,
    category: category === "all" ? "" : category,
    minPrice,
    maxPrice,
    sort: sort === "none" ? undefined : sort,
    page,
    limit,
  });
  // Use `useEffect` to sync the category state with URL changes
  useEffect(() => {
    setCategory(categoryFromUrl); // Sync category state with the URL
  }, [categoryFromUrl]);
  const products = (productsData as any)?.data?.result;
  const apiLimit = (productsData as any)?.data?.limit;
  const apiTotal = (productsData as any)?.data?.total;
  const totalPages = Math.ceil(apiTotal / apiLimit);

  const handleClear = () => {
    setSearch("");
    setCategory("all");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSort("none");
    setPage(1);
    setLimit(10);
    refetch();
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    refetch();
  };

  const filteredProducts = products?.filter(
    (product: Product) => !product.isDeleted
  );

  return (
    <>
      <PageTitle title="Products" breadcrumbs={breadcrumbs} />
      <div className="container py-20">
        <div className="">
          <div className="flex flex-wrap items-end">
            <div className="flex-1 m-2 min-w-[155px]">
              <label htmlFor="search" className="block mb-2">
                Search
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 m-2 min-w-[155px]">
              {isCategoriesLoading && <p>Loading...</p>}
              <label htmlFor="category" className="block mb-2">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories?.data?.map(
                      (cat: { _id: string; name: string }) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 m-2 min-w-[155px]">
              <label htmlFor="minPrice" className="block mb-2">
                Min Price
              </label>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min Price"
                value={minPrice ?? ""}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="flex-1 m-2 min-w-[155px]">
              <label htmlFor="maxPrice" className="block mb-2">
                Max Price
              </label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max Price"
                value={maxPrice ?? ""}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="flex-1 m-2 min-w-[155px]">
              <label htmlFor="sort" className="block mb-2">
                Sort by Price
              </label>
              <Select
                value={sort}
                onValueChange={(value) =>
                  setSort(value as "asc" | "desc" | "none")
                }
              >
                <SelectTrigger id="sort" className="w-full">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="none">Sort by Price</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 m-2 min-w-[155px]">
              <label htmlFor="productsPerPage" className="block mb-2">
                Products per Page
              </label>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(parseInt(value, 10));
                  // refetch(); // Uncomment if you have a refetch function
                }}
              >
                <SelectTrigger id="productsPerPage" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Items per Page</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 m-2 min-w-[155px]">
              <Button
                className="w-full bg-[#1b352c] hover:bg-[#1b352c]"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </div>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong. Please try again later.</p>}

          {products?.length > 0 ? (
            <div className="my-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts?.map((product: Product) => (
                  <ProductCard
                    key={product._id}
                    image={product?.imageUrl ? `${product.imageUrl[0]}` : ""}
                    title={product.name}
                    description={product.description}
                    rating={product?.ratings || 0}
                    id={product._id}
                    stock={product?.stock || 0}
                    price={product?.price}
                    totalSold={product?.totalSold || 0}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <h1 className="text-red-600 font-bold">No products found</h1>
            </div>
          )}

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
      </div>
    </>
  );
};

export default Products; 
      