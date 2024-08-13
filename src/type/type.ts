export type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category?: {
        _id: string;
        name: string;
    };
    imageUrl: string;
    ratings?: number;
    recommended?: boolean;
    stock?: number;
    featured?: boolean;
    
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
export type TApiResponse ={
    result: Products[];
    total: number;
    page: number;
    limit: number;
    minPriceProduct: number;
    maxPriceProduct: number;
}