export enum ProductCategory {
    ELECTRONICS = "Electronics",
    GROCERY = "Grocery",
    FASHION = "Fashion",
    STATIONERY = "Stationery",
    OTHER = "Other",
}

export interface ProductQuery {
    search?: string;
    category?: string;
    page?: string;
    limit?: string;
    sort?: string;
}

export interface CreateProductPayload {
    name: string;
    sku: string;
    category: ProductCategory;
    purchasePrice: number;
    sellingPrice: number;
    stockQuantity: number;
    image?: string;
}

export interface UpdateProductPayload {
    name?: string;
    sku?: string;
    category?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    stockQuantity?: number;
    image?: string;
}