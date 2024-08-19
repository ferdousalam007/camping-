import SectionHeading from "@/components/SectionHeading";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import { Product, TApiResponse } from "@type/type";
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
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const debouncedSearch = useDebounce(search, 1000); // 1 second debounce

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

  return (
    <div className="container">
      <div className="py-12">
        <SectionHeading
          headingText="Products"
          paragraphText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium"
        />
      </div>
      <div>
        <div className="flex flex-wrap">
          <div className="flex-1 m-2">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-1 m-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
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
          <div className="flex-1 m-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice ?? ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex-1 m-2">
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice ?? ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex-1 m-2">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full">
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
          <div className="flex-1 m-2">
            <Button onClick={handleClear}>Clear</Button>
          </div>
          <div className="flex-1 m-2">
            <label htmlFor="productsPerPage">Products per Page:</label>
            <Select
              value={limit.toString()}
              onValueChange={(value) => {
                setLimit(parseInt(value, 10));
                refetch();
              }}
            >
              <SelectTrigger className="w-full">
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
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong. Please try again later.</p>}

        <div className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {products?.map((product: Product) => (
              <ProductCard
                key={product._id}
                image={product.imageUrl[0]}
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
