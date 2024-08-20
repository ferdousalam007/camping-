import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCategoryMutation } from "@/redux/api/baseApi";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image is required",
  }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const [createCategory, { isLoading, isError, error, isSuccess }] =
    useCreateCategoryMutation();

  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);

    await createCategory(formData);

    if (isSuccess) {
      reset();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Create Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            className={`mt-1 block w-full py-2 px-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
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
            className={`mt-1 block w-full py-2 px-3 border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer`}
          />
          {errors.image && (
            <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
        {isError && (
          <p className="mt-2 text-sm text-red-600">
            Error: {error?.data?.message || "Something went wrong"}
          </p>
        )}
        {isSuccess && (
          <p className="mt-2 text-sm text-green-600">
            Category created successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateCategory;
