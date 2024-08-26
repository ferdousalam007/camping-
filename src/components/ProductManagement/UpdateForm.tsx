import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  useUpdateSingleProductMutation,
  useGetCategoriesQuery,
} from "@/redux/api/baseApi";
import { Product } from "@type/type";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Button } from "@/components/ui/button";

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const isValidImageFile = (file?: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  return file && validTypes.includes(file.type) && file.size <= MAX_IMAGE_SIZE;
};

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a non-negative number"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  ratings: z.number().min(0).max(5).optional(),

  images: z
    .array(z.instanceof(File))
    .nullable()
    .refine(
      (files) =>
        files === null || (files.length > 0 && files.length <= MAX_IMAGES),
      {
        message: `Please upload between 1 and ${MAX_IMAGES} images.`,
      }
    )
    .refine((files) => files === null || files.every(isValidImageFile), {
      message:
        "Each image must be a valid file type (jpg, png, jpeg) and under 5MB.",
    }),

  featured: z.boolean().optional(),
  recommended: z.boolean().optional(),
});

type UpdateFormProps = {
  selectedProduct: Product;
  onClose: () => void;
  setSelectedProduct: (product: Product) => void;
};

type ProductFormValues = z.infer<typeof productSchema>;

const UpdateForm: React.FC<UpdateFormProps> = ({
  selectedProduct,
  onClose,
  // setSelectedProduct,
}) => {
  const [previews, setPreviews] = useState<string[]>(
    Array.isArray(selectedProduct.imageUrl)
      ? selectedProduct.imageUrl
      : selectedProduct.imageUrl
      ? [selectedProduct.imageUrl] // Wrap the single string in an array
      : []
  );
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] =
    useState(false);

  const handleCategoryClick = () => {
    setIsCreateCategoryDialogOpen(true);
  };

  const {
    name,
    price,
    stock,
    description,
    category,
    ratings,
    imageUrl,
    featured,
    recommended,
    _id,
  }: Product = selectedProduct;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name,
      price,
      stock,
      description,
      category: category?._id,
      ratings,
      images: null,
      featured,
      recommended,
    },
  });

  const [updateProduct, { isLoading, isError, error, isSuccess }] =
    useUpdateSingleProductMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");
  const watchImages = watch("images");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.slice(0, MAX_IMAGES);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
      setValue("images", files as any); // Update the form's image field
    },
    [setValue]
  );

 const { getRootProps, getInputProps } = useDropzone({
   onDrop,
   accept: ["image/jpeg", "image/png", "image/jpg"],
   maxSize: MAX_IMAGE_SIZE,
   multiple: true,
 });


  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (data.ratings !== undefined) {
      formData.append("ratings", data.ratings.toString());
    }
    if (data.featured !== undefined) {
      formData.append("featured", data.featured.toString());
    }
    if (data.recommended !== undefined) {
      formData.append("recommended", data.recommended.toString());
    }
    if (watchImages && watchImages.length > 0) {
      watchImages.forEach((file) => formData.append("images", file));
    } else if (Array.isArray(imageUrl) && imageUrl.length > 0) {
      imageUrl.forEach((url) => formData.append("imageUrl", url));
    }

    await updateProduct({ id: _id, formData: formData });

    if (isSuccess) {
      reset();
      onClose();
    }
  };

  useEffect(() => {
    if (selectedProduct.imageUrl) {
      setPreviews(
        Array.isArray(selectedProduct.imageUrl)
          ? selectedProduct.imageUrl
          : [selectedProduct.imageUrl] // Wrap the single string in an array
      );
    }
  }, [selectedProduct.imageUrl]);

  if (isCategoriesLoading) return <div>Loading categories...</div>;

  return (
    <div className="h-[500px] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-2 text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="mt-2 text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              id="price"
              type="number"
              step="1"
              {...register("price", { valueAsNumber: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.price && (
              <p className="mt-2 text-red-600">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock:
            </label>
            <input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.stock && (
              <p className="mt-2 text-red-600">{errors.stock.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
             Select Category:
            </label>
            <div className="flex">
              <select
                id="category"
                {...register("category")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories?.data?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={handleCategoryClick}
                variant="outline"
              >
               + Add Category
              </Button>
            </div>
            {errors.category && (
              <p className="mt-2 text-red-600">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="ratings"
              className="block text-sm font-medium text-gray-700"
            >
              Ratings (Optional):
            </label>
            <input
              id="ratings"
              type="number"
              {...register("ratings", { valueAsNumber: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.ratings && (
              <p className="mt-2 text-red-600">{errors.ratings.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images (max {MAX_IMAGES}):
          </label>
          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-full object-cover"
                  />
                  {/* <button
                    type="button"
                    onClick={() => {
                      const newPreviews = previews.filter(
                        (_, i) => i !== index
                      );
                      setPreviews(newPreviews);
                      const newFiles = newPreviews
                        .map((_, idx) => watchImages && watchImages[idx])
                        .filter((_, idx) => idx !== index);
                      setValue(
                        "images",
                        newFiles.length > 0
                          ? newFiles.filter(
                              (file): file is File => file !== null
                            )
                          : null
                      );
                      URL.revokeObjectURL(previews[index]);
                    }}
                    className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                  >
                    X
                  </button> */}
                </div>
              ))}
            </div>
          )}
          {errors.images && (
            <p className="mt-2 text-red-600">{errors.images.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="featured"
            type="checkbox"
            {...register("featured")}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label
            htmlFor="featured"
            className="ml-2 block text-sm text-gray-900"
          >
            Featured
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="recommended"
            type="checkbox"
            {...register("recommended")}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label
            htmlFor="recommended"
            className="ml-2 block text-sm text-gray-900"
          >
            Recommended
          </label>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
      {isSuccess && (
        <p className="mt-2 text-green-600">Product updated successfully.</p>
      )}
      {/* Create Category Dialog */}
      {isCreateCategoryDialogOpen && (
        <CreateCategoryDialog
          isOpenCategory={isCreateCategoryDialogOpen}
          onCloseCategory={() => setIsCreateCategoryDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default UpdateForm;

