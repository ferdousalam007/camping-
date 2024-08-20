export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category?: {
        _id: string;
        name: string;
    };
    imageUrl: string[];
    ratings?: number | 0;
    recommended?: boolean;
    stock?: number | 0;
    featured?: boolean;
    data?: Product[];
    totalSold?: number | 0;
    isDeleted?: boolean;
}
export type Result= {
    description: string;
    featured: boolean;
    imageUrl: string;
    name: string;
    price: number;
    ratings: number;
    recommended: boolean;
    stock: number;
}
export type ProductQueryParams = {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'asc' | 'desc' | '';
    page?: number;
    limit?: number;

}
export type ProductsResponse ={
    products: Product;
    total: number;
    page: number;
    limit: number;
    data: Product[];
    result:Product[];
}




// Define the type for the category object
export type Category ={
    _id?: string;
    name: string;
    imageUrl: string;
    __v?: number;
}

// Define the type for the product object
type Products ={
    totalSold?: number;
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: Category;
    ratings: number;
    imageUrl: string;
    featured: boolean;
    recommended: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    isDeleted?: boolean;
}

// Define the type for the pagination object
// type Pagination ={
//     page: number;
//     limit: number;
//     total: number;
// }

// Define the type for the API response
export type TApiResponse = {
    result: Products[];
    total: number;
    page: number;
    limit: number;
    minPriceProduct: number;
    maxPriceProduct: number;
    data?: Product[];
    isLoading?: boolean; // Add isLoading property
    isError?: boolean; // Add isError property
};
// src/type/type.ts
export type UseQueryHookResult<T> = {
    data: T | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
};

export type ProductRes = {
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: {
        _id: string;
        name: string;
        imageUrl: string;
        __v: number;
    };
    ratings: number; // Ensure this is typed as number
    imageUrl: string[];
    featured: boolean;
    recommended: boolean;
    isDeleted: boolean;
    totalSold: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
export type TApiResponseRes = {
    success: boolean;
    message: string;
    data: {
        result: ProductRes[];
        total: number;
        minPriceProduct: number;
        maxPriceProduct: number;
        page: number;
        limit: number;
    };
};