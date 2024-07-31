import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductQueryParams, ProductsResponse } from "@type/type";
import { TagDescription } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include'
    }),
    tagTypes: ['Product', 'Category'],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: (result, error, { products }) =>
                Array.isArray(products) ? products.map(({ productId }) => ({ type: 'Product', id: productId })) : [],
        }),
        getAllProducts: builder.query({
            query: ({ page = 1, limit = 10, search, category, minPrice, maxPrice, sort }) => {
                let query = `/products?page=${page}&limit=${limit}`;
                if (search) query += `&search=${search}`;
                if (category) query += `&category=${category}`;
                if (minPrice) query += `&minPrice=${minPrice}`;
                if (maxPrice) query += `&maxPrice=${maxPrice}`;
                if (sort) query += `&sort=${sort}`;
                return query;
            },
            providesTags: (result: ProductsResponse | undefined) =>
                result && Array.isArray(result.products) && result.products.length > 0
                    ? [{ type: 'Product', id: result.products[0].id }, 'Product']
                    : ['Product'],
        }),
        updateSingleProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Product','Category'],
            // invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
            // async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
            //     try {
            //         await queryFulfilled;
            //         // Refetch the single product query after the mutation is fulfilled
            //         dispatch(baseApi.endpoints.getSinglProduct.initiate(id));
            //     } catch (error) {
            //         console.error('Mutation failed:', error);
            //     }
            // },
        }),
        getProducts: builder.query<ProductsResponse, ProductQueryParams>({
            query: ({ search, category, minPrice, maxPrice, sort, page, limit }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);
                if (minPrice) params.append('minPrice', minPrice.toString());
                if (maxPrice) params.append('maxPrice', maxPrice.toString());
                if (sort) params.append('sort', sort);
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                return `products?${params.toString()}`;
            },
            providesTags: (result: ProductsResponse | undefined): readonly TagDescription<"Product" | "Category">[] =>
                Array.isArray(result)
                    ? result.map(({ id }): TagDescription<"Product" | "Category"> => ({ type: 'Product', id }))
                    : [],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        createCategory: builder.mutation({
            query: (category) => ({
                url: '/category',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category', 'Product'],
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        getSinglProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        })
    }),
});

export const {
    useCreateProductMutation,
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useGetAllProductsQuery,
    useGetProductsQuery,
    useGetSinglProductQuery,
    useDeleteProductMutation,
    useUpdateSingleProductMutation,
    useCreateOrderMutation
} = baseApi;