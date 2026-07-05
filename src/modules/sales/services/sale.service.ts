import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import ApiError from "../../../utils/ApiError";

import { Customer } from "../../customers/models/customer.model";
import { Product } from "../../products/models/product.model";

import { Sale } from "../models/sale.model";

import { CreateSalePayload } from "../sale.types";

export const SaleService = {
    async createSale(payload: CreateSalePayload, userId: string) {
        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            const customer = await Customer.findById(payload.customer).session(
                session,
            );

            if (!customer) {
                throw new ApiError(StatusCodes.NOT_FOUND, "Customer not found");
            }

            let grandTotal = 0;
            const saleItems = [];

            for (const item of payload.products) {
                const product = await Product.findById(item.product).session(session);

                if (!product) {
                    throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
                }

                if (product.stockQuantity < item.quantity) {
                    throw new ApiError(
                        StatusCodes.BAD_REQUEST,
                        `${product.name} stock is insufficient`,
                    );
                }

                const totalPrice = product.sellingPrice * item.quantity;

                grandTotal += totalPrice;

                saleItems.push({
                    product: product._id,

                    quantity: item.quantity,

                    unitPrice: product.sellingPrice,

                    totalPrice,
                });

                product.stockQuantity -= item.quantity;

                await product.save({
                    session,
                });
            }

            const [sale] = await Sale.create(
                [
                    {
                        customer: customer._id,

                        products: saleItems,

                        grandTotal,

                        createdBy: userId,
                    },
                ],
                {
                    session,
                },
            );

            await session.commitTransaction();

            return sale;
        } catch (error) {
            await session.abortTransaction();

            throw error;
        } finally {
            session.endSession();
        }
    },

    // Get Sales with pagination
    async getSales(query: { page?: string; limit?: string }) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const skip = (page - 1) * limit;

        const sales = await Sale.find()
            .populate("customer", "name phone")
            .populate("createdBy", "name email role")
            .populate("products.product", "name sku image")
            .sort("-createdAt")
            .skip(skip)
            .limit(limit);

        const total = await Sale.countDocuments();

        return {
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
            data: sales,
        };
    },
};
