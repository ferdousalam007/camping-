/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "@/redux/api/baseApi";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Textarea } from "../ui/textarea";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a non-negative number"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  ratings: z.number().min(0).max(5).optional(),
  images: z
    .array(
      z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Image size must be less than 5MB",
      })
    )
    .max(5, "You can upload a maximum of 5 images"),
  featured: z.boolean().optional(),
  recommended: z.boolean().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [createProduct, { isLoading, isError , isSuccess }] =
    useCreateProductMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentImages = watch("images") || [];
      const newImages = [...currentImages, ...acceptedFiles].slice(0, 5); // Limit to 5 images
      setValue("images", newImages);
      setImagePreviews(newImages.map((file) => URL.createObjectURL(file)));
    },
    [setValue, watch]
  );

  const removeImage = (index: number) => {
    const currentImages = watch("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
    setImagePreviews(newImages.map((file) => URL.createObjectURL(file)));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accept: "image/*" as any,
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
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
   data.images.forEach((image) => {
     formData.append("images", image);
   });

   try {
     await createProduct(formData).unwrap();
     // Reset form and clear image previews upon successful submission
     reset({
       name: "",
       price: 0,
       stock: 0,
       description: "",
       category: "",
       ratings: 1,
       featured: false,
       recommended: false,
       images: [],
     });
     setImagePreviews([]);
   } catch (err) {
     console.error("Failed to create product:", err);
   }
 };
     {
       isSuccess &&
         toast.success("Product created successfully", { duration: 2000 });
     }
     {
       isError && toast.error("Failed to create product", { duration: 2000 });
     }
  return (
    <div>
      <Toaster position="top-center" richColors />
      <h1 className="text-3xl font-bold mb-4 text-center">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1"
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
            {/* <Input
              as="textarea"
              id="description"
              {...register("description")}
              className="mt-1"
            /> */}
            <Textarea
              id="description"
              {...register("description")}
              className="mt-1 "
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
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="mt-1"
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
            <Input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="mt-1"
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
            </label>
            <select
              id="category"
              {...register("category")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select a category
              </option>
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
            <Input
              id="ratings"
              type="number"
              step="0.1"
              {...register("ratings", { valueAsNumber: true })}
              className="mt-1"
            />
            {errors.ratings && (
              <p className="mt-2 text-red-600">{errors.ratings.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images:
            </label>
            <div
              {...getRootProps()}
              className={`mt-1 block w-full py-4 px-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer ${
                isDragActive ? "bg-gray-100" : ""
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center flex align-middle justify-center gap-2">
                <ImagePlus /> Drag & drop some files here, or click to select
                files
              </p>
            </div>
            {errors.images && (
              <p className="mt-2 text-red-600">{errors.images.message}</p>
            )}
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-auto"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="featured" className="inline-flex items-center">
              <input
                id="featured"
                type="checkbox"
                {...register("featured")}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Featured
              </span>
            </label>
            <br />
            <label
              htmlFor="recommended"
              className="inline-flex items-center mt-2"
            >
              <input
                id="recommended"
                type="checkbox"
                {...register("recommended")}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Recommended
              </span>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full bg-[#1b352c] hover:bg-[#ff8851]"
          disabled={isLoading || isCategoriesLoading}
        >
          {isLoading || isCategoriesLoading
            ? "Submitting..."
            : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
