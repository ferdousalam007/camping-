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
import { Product } from "@type/type";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateProductDialog from "./UpdateProductDialog";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const GetAllProduct = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [sort, setSort] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting, isError: isDeleted }] =
    useDeleteProductMutation();

  const {
    data: products,
    isLoading,
    refetch,
    error,
  } = useGetAllProductsQuery({
    page,
    limit,
    search,
    category,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sort,
  });

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId).then(() => refetch());
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error fetching products.
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

  const newProducts: Product[] = products?.data?.result || [];
  const totalPages = Math.ceil((products?.total ?? 0) / limit);

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
            step={10}
            className="mt-2"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 mt-2"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <button
          onClick={() => {
            // Reset all filter state variables
            setSearch("");
            setCategory("");
            setPriceRange([0, 1000]);
            setSort("asc");
            // Call refetch to apply the reset filters
            refetch();
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
                  src={product.imageUrl}
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
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  isActive={page === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    isActive={page === index + 1}
                  >
                    {index + 1} 
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  isActive={products && page * limit >= products.total}
                />
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
