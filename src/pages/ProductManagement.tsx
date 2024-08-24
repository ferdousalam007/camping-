import CreateProduct from "@/components/ProductManagement/CreateProduct";
import CreateCategory from "@/components/ProductManagement/CreateCategory";
import GetAllProduct from "@/components/ProductManagement/GetAllProduct";
// import GetAllProducts from "@/components/ProductManagement/GetAllProducts";
import PageTitle from "@/components/PageTitle";
import GetAllOrder from "@/components/ProductManagement/GetAllOrder";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: `Product Management` },
];
const ProductManagement = () => {
  
  return (
    <>
      <div>
        <PageTitle title="Product Management" breadcrumbs={breadcrumbs} />
        <div className="py-20 container">
          <GetAllProduct />
          <GetAllOrder/>
          {/* <GetAllProducts /> */}
          <CreateCategory />
          <CreateProduct />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;

