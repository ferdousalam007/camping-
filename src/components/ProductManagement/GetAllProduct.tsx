/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "@/redux/api/baseApi";
import {  TApiResponse } from "@/type/type";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateProductDialog from "./UpdateProductDialog";
// import CreateCategoryDialog from "./CreateCategoryDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input"; // Importing Input component
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

const GetAllProduct = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const [search, setSearch] = useState("");
  // Update the category and sort values in the state to be undefined initially
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery<TApiResponse>({
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  });

  const apiLimit = (products as any)?.data?.limit;
  const apiTotal = (products as any)?.data?.total;
  const newResult: TApiResponse = (products as any)?.data || [];
  const newProducts = newResult?.result || [];
  const totalPages = Math.ceil(apiTotal / apiLimit);
console.log(newProducts)
  const handleClear = () => {
    setSearch("");
    setCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSort(undefined);
    setPage(1);
    setLimit(10);
    refetch();
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    refetch();
  };

  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap(); // Ensure the mutation is unwrapped to handle errors properly
      refetch();
      toast.success("Product deleted successfully", { duration: 2000 });
    } catch (error) {
      isError &&
        toast.error((error as any)?.data?.message || "An error occurred");
    }
  };
  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        loading...
      </div>
    );
  }
if (isCategoriesLoading) {
  return (
    <div className="flex justify-center items-center h-screen">loading...</div>
  );
}
   if (newProducts?.length === 0) {
     return (
       <div className="flex justify-center items-center h-screen">
         no products found
       </div>
     );
   }

  // if (isDeleting) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <h1 className="text-2xl ">Deleting...</h1>
  //     </div>
  //   );
  // }

  const filteredProducts = newProducts.filter((product) => !product.isDeleted);

  return (
    <div>
      {/* Add Toaster component to render the toast messages */}
      <Toaster position="top-center" richColors />
      <h1 className="text-3xl font-bold mb-4">Get All Products</h1>

      <div className="mb-4">
        <div className="flex flex-wrap items-end">
          <div className="flex-1 m-2">
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
          <div className="flex-1 m-2">
            <label htmlFor="category" className="block mb-2">
              Category
            </label>

            <Select
              value={category}
              onValueChange={(value) => setCategory(value || undefined)}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <Select
                    value={category ?? ""}
                    onValueChange={(value) => setCategory(value ?? "")}
                  >
                    {/* ... */}
                  </Select>
                  {categories?.data.map(
                    (category: { _id: string; name: string }) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 m-2">
            <label htmlFor="minPrice" className="block mb-2">
              Min Price
            </label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min Price"
              value={minPrice ?? ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex-1 m-2">
            <label htmlFor="maxPrice" className="block mb-2">
              Max Price
            </label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max Price"
              value={maxPrice ?? ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex-1 m-2">
            <label htmlFor="sort" className="block mb-2">
              Sort by Price
            </label>

            <Select
              value={sort}
              onValueChange={(value) =>
                setSort(value as "asc" | "desc" | undefined)
              }
            >
              <SelectTrigger id="sort" className="w-full">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <Select
                    value={sort ?? ""}
                    onValueChange={(value) =>
                      setSort(value as "asc" | "desc" | undefined)
                    }
                  >
                    Sort by Price
                  </Select> */}
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 m-2">
            <label htmlFor="productsPerPage" className="block mb-2">
              Products per Page
            </label>
            <Select
              value={limit.toString()}
              onValueChange={(value) => {
                // Update the limit state directly with the parsed value
                setLimit(parseInt(value, 10));
                // Refetch the data after updating the limit
                refetch();
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
          <div className="flex-1 m-2">
            <button
              onClick={() => handleClear()}
              className="w-full p-2 bg-[#1b352c] text-white hover:bg-[#1b352c]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your recent products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name </TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                <img
                  src={product?.imageUrl[0]}
                  alt={product?.name}
                  className="w-[80px] h-[80px] object-cover rounded"
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{product?.category?.name}</TableCell>
              <TableCell className="text-right">${product?.price}</TableCell>
              <TableCell className="text-right">
                <Trash2
                  onClick={() => handleDeleteProduct(product._id)}
                  className="cursor-pointer text-right inline-block text-red-600"
                />
                <FilePenLine
                  onClick={() => handleEditClick(product)}
                  className="cursor-pointer text-right inline-block ml-3 text-green-700"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
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
        </TableFooter>
      </Table>
      <UpdateProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedProduct={selectedProduct}
      />
      {/* <CreateCategoryDialog /> */}
    </div>
  );
};

export default GetAllProduct;
// product per page 10 not working