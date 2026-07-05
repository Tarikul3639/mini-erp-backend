export interface CreateCustomerPayload {
    name: string;
    phone: string;
    email?: string;
    address?: string;
}

export interface UpdateCustomerPayload {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface CustomerQuery {
    search?: string;
    page?: string;
    limit?: string;
}