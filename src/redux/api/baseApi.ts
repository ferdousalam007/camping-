import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductQueryParams, ProductsResponse } from "@type/type";


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
        getAllProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
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
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET',
            }),
        }),
        getSinglProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useCreateProductMutation, useGetCategoriesQuery, useGetAllProductsQuery, useGetProductsQuery,useGetSinglProductQuery } = baseApi;