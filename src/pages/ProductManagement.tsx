import CreateProduct from "@/components/ProductManagement/CreateProduct";
import CreateCategory from "@/components/ProductManagement/CreateCategory";
import GetAllProduct from "@/components/ProductManagement/GetAllProduct";
// import GetAllProducts from "@/components/ProductManagement/GetAllProducts";
import PageTitle from "@/components/PageTitle";
import GetAllOrder from "@/components/ProductManagement/GetAllOrder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <GetAllOrder />
          {/* <GetAllProducts /> */}

          <div >
            <h1 className="text-2xl md:text-3xl font-medium mb-4">
              First Create Category or Product
            </h1>
            <Tabs className="mx-auto" defaultValue="CreateCategory">
              <TabsList>
                <TabsTrigger  value="CreateCategory">CreateCategory</TabsTrigger>
                <TabsTrigger value="CreateProduct">CreateProduct</TabsTrigger>
              </TabsList>
              <TabsContent value="CreateCategory">
                <CreateCategory />
              </TabsContent>
              <TabsContent value="CreateProduct">
                <CreateProduct />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManagement;

