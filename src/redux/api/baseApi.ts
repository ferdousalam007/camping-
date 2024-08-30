import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductQueryParams, ProductsResponse } from "@/type/type";
// import { TagDescription } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include'
    }),
    tagTypes: ['Product', 'Category', 'Order'],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product', 'Category'],
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Product', 'Category', 'Order'],
        }),
        getAllOrder: builder.query({
           query: () => ({
               url: '/orders',
               method: 'GET',
               credentials: 'include'
           }),
           providesTags: ['Order'], 
        }),
        getAllproduct: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Product'],
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
            invalidatesTags: ['Product', 'Category'],
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
            // providesTags: (result, error, id) => [{ type: 'Product', id }],
            // providesTags: (result, error, id) => [{ type: 'Product', id }],
            providesTags: (result) => {
                if (result && Array.isArray(result.products) && result.products.length > 0) {
                    return [{ type: 'Product', id: result.products[0].id }];
                }
                return ['Product'];
            }
            
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
    useCreateOrderMutation,
    useGetAllproductQuery,
    useGetAllOrderQuery,

} = baseApi;