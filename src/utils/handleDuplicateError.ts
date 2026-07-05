import mongoose from "mongoose";

import { TErrorResponse } from "../interfaces/error.interface";

const handleDuplicateError = (
    err: mongoose.mongo.MongoServerError
): TErrorResponse => {
    const field = Object.keys(err.keyPattern ?? {})[0] || "";
    const value = Object.values(err.keyValue ?? {})[0];

    return {
        statusCode: 409,
        message: "Duplicate Value",
        errorSources: [
            {
                path: field,
                message: `${value} already exists`,
            },
        ],
    };
};

export default handleDuplicateError;