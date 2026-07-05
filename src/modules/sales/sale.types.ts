export interface SaleItem {
    product: string;

    quantity: number;
}

export interface CreateSalePayload {
    customer: string;

    products: SaleItem[];
}