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
    .instanceof(FileList)
    .nullable()
    .refine(
      (files) =>
        files === null || (files.length > 0 && files.length <= MAX_IMAGES),
      {
        message: `Please upload between 1 and ${MAX_IMAGES} images.`,
      }
    )
    .refine(
      (files) => files === null || Array.from(files).every(isValidImageFile),
      {
        message:
          "Each image must be a valid file type (jpg, png, jpeg) and under 5MB.",
      }
    ),
  featured: z.boolean().optional(),
  recommended: z.boolean().optional(),
});

type UpdateFormProps = {
  selectedProduct: Product;
  onClose: () => void;
};

type ProductFormValues = z.infer<typeof productSchema>;

const UpdateForm: React.FC<UpdateFormProps> = ({
  selectedProduct,
  onClose,
}) => {
  const [previews, setPreviews] = useState<string[]>(
    Array.isArray(selectedProduct.imageUrl)
      ? selectedProduct.imageUrl
      : selectedProduct.imageUrl
      ? selectedProduct.imageUrl.split(",")
      : []
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleCategoryClick = () => {
    setIsCategoriesOpen(true);
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
    accept: "image/jpeg, image/png, image/jpg",
    maxSize: MAX_IMAGE_SIZE,
    multiple: true,
    maxFiles: MAX_IMAGES,
  });

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

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
      Array.from(watchImages).forEach((file) =>
        formData.append("images", file)
      );
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
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
          : selectedProduct.imageUrl.split(",")
      );
    }
  }, [selectedProduct.imageUrl]);

  if (isCategoriesLoading) return <div>Loading categories...</div>;

  return (
    <div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
              <Button
                onClick={handleCategoryClick}
                className="cursor-pointer text-right inline-block ml-3 text-white"
              >
                Create Category
              </Button>
            </label>
            <select
              id="category"
              {...register("category")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {categories?.data.map(
                (category: { _id: string; name: string }) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <p className="mt-2 text-red-600">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="ratings"
              className="block text-sm font-medium text-gray-700"
            >
              Ratings:
            </label>
            <input
              id="ratings"
              type="number"
              step="0.1"
              {...register("ratings", { valueAsNumber: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.ratings && (
              <p className="mt-2 text-red-600">{errors.ratings.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="featured"
              className="block text-sm font-medium text-gray-700"
            >
              Featured:
            </label>
            <input
              id="featured"
              type="checkbox"
              {...register("featured")}
              className="mt-1 block w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="recommended"
              className="block text-sm font-medium text-gray-700"
            >
              Recommended:
            </label>
            <input
              id="recommended"
              type="checkbox"
              {...register("recommended")}
              className="mt-1 block w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-700">
            Drag & drop some files here, or click to select files
          </p>
        </div>

        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="object-cover h-20 w-full rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {isError && (
          <p className="mt-2 text-red-600">{(error as Error).message}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
      <CreateCategoryDialog
        isOpenCategory={isCategoriesOpen}
        onCloseCategory={() => setIsCategoriesOpen(false)}
      />
    </div>
  );
};

export default UpdateForm;
