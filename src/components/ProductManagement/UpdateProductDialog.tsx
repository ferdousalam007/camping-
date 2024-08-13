import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Product } from "@type/type";
import UpdateForm from "./UpdateForm";
type UpdateProductProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;

};

const UpdateProductDialog: React.FC<UpdateProductProps> = ({
  selectedProduct,
  isOpen,
  onClose,

}) => {


  if (!selectedProduct) {
    return <div>No product selected</div>;
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-3xl font-bold mb-4">Update Product</h1>
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          <UpdateForm
            selectedProduct={selectedProduct}
            onClose={onClose}
        
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProductDialog;
