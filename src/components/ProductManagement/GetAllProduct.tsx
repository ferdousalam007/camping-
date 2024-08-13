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
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "@/redux/api/baseApi";
import { Product, TApiResponse } from "@type/type";
import { FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateProductDialog from "./UpdateProductDialog";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CreateCategoryDialog from "./CreateCategoryDialog";

const GetAllProduct = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  // const [minPrice, setMinPrice] = useState<number | undefined>();
  // const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [sort, setSort] = useState<"asc" | "desc" | "">();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
   const [priceRange, setPriceRange] = useState([0, 1000]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery<TApiResponse>({
    search,
    category,
    minPrice: priceRange[0], 
    maxPrice: priceRange[1],
    sort,
    page,
    limit,
  
  });

  const apiLimit = products?.data?.limit; //this is api response limit
  const apiTotal = products?.data?.total;
  const newResult: TApiResponse = products?.data || [];
  const newProducts: Product[] = newResult?.result || [];
  const totalPages = Math.ceil(apiTotal / apiLimit);

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setPage(1);
    setLimit(10);
    refetch();
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    refetch();
  };

 
  const [deleteProduct, { isLoading: isDeleting, isError: isDeleted }] =
    useDeleteProductMutation();



  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId).then(() => refetch());
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handlePriceRangeChange = (newPriceRange: [number, number]) => {
    setPriceRange(newPriceRange);
    setPage(1); // Reset page to 1 when price range changes
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        loading...
      </div>
    );
  }

 

  if (products?.result?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        no products found
      </div>
    );
  }

  if (isDeleting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl ">Deleting...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Get All Products</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mr-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories?.data.map((category: { _id: string; name: string }) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="mt-4">
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            min={0}
            max={1000}
            step={1}
            className="mt-2"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
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
        <button
          onClick={() => {
            handleClear();
          }}
          className="ml-2 p-2 bg-blue-500 text-white"
        >
          Reset
        </button>
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
          {newProducts.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="w-full h-[80px] object-cover"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product?.category?.name}</TableCell>
              <TableCell className="text-right">${product.price}</TableCell>
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
    
    </div>
  );
};

export default GetAllProduct;
