import {
    HydratedDocument,
    InferSchemaType,
    Schema,
} from "mongoose";

import { UserRole } from "../user.types";

export const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },

        avatar: {
            type: String,
            default: null,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.EMPLOYEE,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export type TUser = InferSchemaType<typeof userSchema>;

export type TUserDocument = HydratedDocument<TUser>;