import { HydratedDocument, InferSchemaType, Schema } from "mongoose";

export const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: null,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "customers",
    },
);

export type TCustomer = InferSchemaType<typeof customerSchema>;

export type TCustomerDocument = HydratedDocument<TCustomer>;
