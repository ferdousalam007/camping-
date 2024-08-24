/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetAllOrderQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GetAllOrder = () => {
  const { data: orderData, isLoading } = useGetAllOrderQuery("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const itemsPerPage = 10;

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 700); // 1-second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filtered data based on debounced search term
  const filteredData = orderData?.data.filter(
    (order: any) =>
      order.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Calculate total pages for filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current items based on current page
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Get All Orders</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-lg"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((order: any) => (
            <TableRow key={order._id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleViewDetails(order)}
                      className="px-4 py-2 bg-[#1b352c] text-white rounded"
                    >
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[500px] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription>
                        Detailed information about the order.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                      <div>
                        <p>
                          <strong>Name:</strong> {selectedOrder.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {selectedOrder.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {selectedOrder.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {selectedOrder.address}
                        </p>
                        <p>
                          <strong>Total Price:</strong>{" "}
                          {selectedOrder.totalPrice}
                        </p>
                        <h3 className="text-lg font-semibold mt-4">
                          Cart Items:
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Image</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.cartItems.map((item: any) => (
                              <TableRow key={item._id}>
                                <TableCell>{item.id.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.id.price}</TableCell>
                                <TableCell>
                                  <img
                                    src={item.id.imageUrl[0]}
                                    alt={item.id.name}
                                    className="w-16 h-16 object-cover"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          className="px-4 py-2 bg-[#ff8851] hover:bg-[#1b352c] text-white rounded"
                          variant="secondary"
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetAllOrder;
