/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Assume you have a Dialog component ready for use
import { Button } from "@/components/ui/button"; // Assume you have a Button component
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
import { useEffect, useState } from "react";
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [productToDelete, setProductToDelete] = useState<string | null>(null); // State for the product to delete
const debouncedSearch = useDebounce(search, 500); 
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery<TApiResponse>({
    search: debouncedSearch,
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

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete).unwrap();
        refetch();
        setIsDeleteModalOpen(false);
        toast.success("Product deleted successfully", { duration: 2000 });
      } catch (error) {
        isError &&
          toast.error((error as any)?.data?.message || "An error occurred");
      }
    }
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
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
      <div className="flex justify-center items-center h-screen">
        loading...
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
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All Categories</SelectItem>

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
          <div className="flex-1 m-2 min-w-[155px]">
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
        {newProducts?.length === 0 && (
          <TableBody>
            <TableRow>
              <TableCell
                className="text-center text-xl text-red-600"
                colSpan={5}
              >
                No products found.
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                <img
                  src={product?.imageUrl ? `${product.imageUrl[0]}` : ""}
                  alt={product?.name}
                  className="w-[80px] h-[80px] object-cover rounded"
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>
                {product?.category?.name.charAt(0).toUpperCase() +
                  product?.category?.name.slice(1).toLowerCase()}
              </TableCell>
              <TableCell className="text-right">${product?.price}</TableCell>
              <TableCell className="text-right">
                <Trash2
                  onClick={() => handleDeleteClick(product._id)}
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
        <TableFooter className="text-center">
          <TableRow>
            <TableCell colSpan={5}>
              <div className="flex justify-center mt-4">
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
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <UpdateProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedProduct={selectedProduct}
      />

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="bg-[#ff8851] mt-3 sm:mt-0"
                onClick={handleDeleteProduct}
              >
                OK
              </Button>
              <Button
                variant="outline"
                className="border-[#ff8851] bg-[#1b352c] text-[#fff] "
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GetAllProduct;