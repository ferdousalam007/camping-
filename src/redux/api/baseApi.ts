import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include'
    }), 
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET',
            }),
        }),
    }),
});

export const { useCreateProductMutation, useGetCategoriesQuery } = baseApi;