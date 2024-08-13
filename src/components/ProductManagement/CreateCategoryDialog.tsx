import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import UpdateCreateCategoryForm from "./UpdateCreateCategoryForm";
type UpdateProductCategoryProps = {
  isOpenCategory: boolean;
  onCloseCategory: () => void;
};

const CreateCategoryDialog: React.FC<UpdateProductCategoryProps> = ({
  isOpenCategory,
  onCloseCategory,
}) => {
  return (
    <div>
      <Dialog open={isOpenCategory} onOpenChange={onCloseCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-2xl font-medium mb-4">
                Create Category for Update Product
              </h1>
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          {/* <UpdateForm selectedProduct={selectedProduct} onClose={onClose} /> */}
          <UpdateCreateCategoryForm onClose={onCloseCategory} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategoryDialog;
