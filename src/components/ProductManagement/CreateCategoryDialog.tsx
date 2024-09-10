import {
  Dialog,
  DialogContent,
  DialogHeader,
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
           
            <DialogClose />
          </DialogHeader>
          {/* <UpdateForm selectedProduct={selectedProduct} onClose={onClose} /> */}
          <UpdateCreateCategoryForm onCloseCategory={onCloseCategory} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategoryDialog;
