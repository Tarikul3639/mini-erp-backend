import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import ApiError from "../../../utils/ApiError";
import { Customer } from "../models/customer.model";
import {
    CreateCustomerPayload,
    UpdateCustomerPayload,
} from "../customer.types";

export const CustomerService = {
    async createCustomer(payload: CreateCustomerPayload) {
        const phoneExists = await Customer.findOne({
            phone: payload.phone,
        });

        if (phoneExists) {
            throw new ApiError(StatusCodes.CONFLICT, "Phone number already exists");
        }

        if (payload.email) {
            const emailExists = await Customer.findOne({
                email: payload.email,
            });

            if (emailExists) {
                throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
            }
        }

        return Customer.create(payload);
    },

    // Get Customers with pagination and search
    async getCustomers(query: {
        search?: string;
        page?: string;
        limit?: string;
    }) {
        const { search, page = "1", limit = "10" } = query;

        const filter: Record<string, unknown> = {};

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    phone: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const currentPage = Number(page);
        const perPage = Number(limit);

        const skip = (currentPage - 1) * perPage;

        const customers = await Customer.find(filter)
            .skip(skip)
            .limit(perPage)
            .sort("-createdAt");

        const total = await Customer.countDocuments(filter);

        return {
            meta: {
                page: currentPage,
                limit: perPage,
                total,
                totalPage: Math.ceil(total / perPage),
            },
            data: customers,
        };
    },

    // Get Single Customer
    async getCustomer(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid customer id");
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Customer not found");
        }

        return customer;
    },

    // Update Customer
    async updateCustomer(id: string, payload: UpdateCustomerPayload) {
        const customer = await Customer.findById(id);

        if (!customer) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Customer not found");
        }

        if (payload.phone && payload.phone !== customer.phone) {
            const exists = await Customer.findOne({
                phone: payload.phone,
                _id: { $ne: id },
            });

            if (exists) {
                throw new ApiError(StatusCodes.CONFLICT, "Phone already exists");
            }
        }

        if (payload.email && payload.email !== customer.email) {
            const exists = await Customer.findOne({
                email: payload.email,
                _id: { $ne: id },
            });

            if (exists) {
                throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
            }
        }

        return Customer.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    },

    // Delete Customer
    async deleteCustomer(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid customer id");
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Customer not found");
        }

        await Customer.findByIdAndDelete(id);

        return null;
    },
};
