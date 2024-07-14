export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
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
    sort?: 'asc' | 'desc';
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




