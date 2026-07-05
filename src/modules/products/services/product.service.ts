import { StatusCodes } from "http-status-codes";
import cloudinary from "../../../config/cloudinary";
import ApiError from "../../../utils/ApiError";
import { Product } from "../models/product.model";
import { ProductQuery, UpdateProductPayload, CreateProductPayload } from "../product.types";
import { QueryBuilder } from "../../../builders/QueryBuilder";
import mongoose from "mongoose";

export const ProductService = {
    async createProduct(
        payload: CreateProductPayload,
        file?: Express.Multer.File
    ) {
        const exists = await Product.findOne({
            sku: payload.sku,
        });

        if (exists) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                "SKU already exists"
            );
        }

        if (!file) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Product image is required"
            );
        }

        const uploadResult =
            await new Promise<any>((resolve, reject) => {
                const stream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: "mini-erp/products",
                        },
                        (error, result) => {
                            if (error) return reject(error);

                            resolve(result);
                        }
                    );

                stream.end(file.buffer);
            });

        const product = await Product.create({
            ...payload,

            image: uploadResult.secure_url,
        });

        return product;
    },


    // Get Products with pagination, filtering, and sorting
    async getProducts(query: ProductQuery) {
        const queryBuilder = new QueryBuilder(
            Product.find(),
            query as Record<string, unknown>
        )
            .search(["name", "sku"])
            .filter()
            .sort()
            .paginate();

        const data = await queryBuilder.modelQuery;

        const meta = await queryBuilder.countTotal();

        return {
            meta,
            data,
        };
    },

    async updateProduct(
        productId: string,
        payload: UpdateProductPayload,
        file?: Express.Multer.File
    ) {
        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Product not found"
            );
        }

        // SKU duplicate check
        if (payload.sku && payload.sku !== product.sku) {
            const exists = await Product.findOne({
                sku: payload.sku,
                _id: { $ne: productId },
            });

            if (exists) {
                throw new ApiError(
                    StatusCodes.CONFLICT,
                    "SKU already exists"
                );
            }
        }

        // Image upload (optional)
        if (file) {
            const uploadResult = await new Promise<any>(
                (resolve, reject) => {
                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "mini-erp/products",
                            },
                            (error, result) => {
                                if (error) return reject(error);

                                resolve(result);
                            }
                        );

                    stream.end(file.buffer);
                }
            );

            payload.image = uploadResult.secure_url;
        }

        const updatedProduct =
            await Product.findByIdAndUpdate(
                productId,
                payload,
                {
                    new: true,
                    runValidators: true,
                }
            );

        return updatedProduct;
    },


    // Delete Product
    async deleteProduct(productId: string) {

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Invalid product id"
            );
        }

        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Product not found"
            );
        }

        await Product.findByIdAndDelete(productId);

        return null;
    },
};