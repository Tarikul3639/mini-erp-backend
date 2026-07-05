import { HydratedDocument, InferSchemaType, Schema } from "mongoose";

export const saleSchema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                unitPrice: {
                    type: Number,
                    required: true,
                },

                totalPrice: {
                    type: Number,
                    required: true,
                },
            },
        ],

        grandTotal: {
            type: Number,
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,

        versionKey: false,

        collection: "sales",
    },
);

export type TSale = InferSchemaType<typeof saleSchema>;
export type TSaleDocument = HydratedDocument<TSale>;
