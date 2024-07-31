import CreateProduct from "@/components/ProductManagement/CreateProduct";
import CreateCategory from "@/components/ProductManagement/CreateCategory";
import GetAllProduct from "@/components/ProductManagement/GetAllProduct";
// import GetAllProducts from "@/components/ProductManagement/GetAllProducts";

const ProductManagement = () => {
  
  return (
    <div className="py-20 container">
      <GetAllProduct/>
      {/* <GetAllProducts /> */}
      <CreateCategory />
      <CreateProduct />
    </div>
  );
};

export default ProductManagement;

