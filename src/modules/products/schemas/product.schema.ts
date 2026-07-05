import { HydratedDocument, InferSchemaType, Schema } from "mongoose";

import { ProductCategory } from "../product.types";

export const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            index: true,
            uppercase: true,
            trim: true,
        },

        category: {
            type: String,
            enum: Object.values(ProductCategory),
            required: true,
        },

        purchasePrice: {
            type: Number,
            required: true,
            min: 0,
        },

        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        stockQuantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "products",
    },
);

export type TProduct = InferSchemaType<typeof productSchema>;

export type TProductDocument = HydratedDocument<TProduct>;
