import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "@/redux/api/baseApi";
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a non-negative number"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  ratings: z.number().min(0).max(5).optional(),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image is required",
  }),
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
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [createProduct, { isLoading, isError, error, isSuccess }] =
    useCreateProductMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery("");

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
    formData.append("image", data.image[0]);

    await createProduct(formData);

    if (isSuccess) {
      reset();
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create Product</h1>
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
              step="0.01"
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
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4">
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
            />
            {errors.image && (
              <p className="mt-2 text-red-600">{`image is required provide a file like png jpeg jpg ${errors.image.message}`}</p>
            )}
          </div>
          <div>
            <label htmlFor="featured" className="inline-flex items-center">
              <input
                id="featured"
                type="checkbox"
                {...register("featured")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
              <span className="ml-2 text-sm text-gray-600">Featured</span>
            </label>
            <label htmlFor="recommended" className="inline-flex items-center">
              <input
                id="recommended"
                type="checkbox"
                {...register("recommended")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 ml-2"
              />
              <span className="ml-2 text-sm text-gray-600">Recommended</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        {isError && (
          <p className="mt-2 text-red-600">
            Error: {(error as Error).message || "Something went wrong"}
          </p>
        )}
        {isSuccess && (
          <p className="mt-2 text-green-600">Product created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
