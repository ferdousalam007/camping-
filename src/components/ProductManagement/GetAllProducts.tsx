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
  useGetProductsQuery,
} from "@/redux/api/baseApi";
import { Product } from "@type/type";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";

import UpdateProductDialog from "./UpdateProductDialog";

const GetAllProducts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
   const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting, isError: isDeleted }] =
    useDeleteProductMutation();
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    page,
    limit,
  });
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
    deleteProduct(productId);
  };
   const handleEditClick = (product: any) => {
     setSelectedProduct(product);
      setIsDialogOpen(true);
   };

  if (isLoading) {
    // Show a loading indicator while loading
    return (
      <div className="flex justify-center items-center h-screen">
        loading...
      </div>
    );
  }
 
  if (products?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        no products found
      </div>
    );
  }

  if (isDeleting) {
    // Show a loading indicator while deleting
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl ">Deleting...</h1>
      </div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newResult: any = products?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newProducts: Product[] = newResult?.result || [];
  const totalPages = Math.ceil(newProducts.length / limit);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Get All Products</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
          {newProducts?.map((product: any) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                <img
                  src={product?.imageUrl}
                  alt={product.name}
                  className="w-full h-[80px] object-cover"
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

export default GetAllProducts;
