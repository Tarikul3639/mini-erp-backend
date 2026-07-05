import mongoose from "mongoose";

import { TErrorResponse } from "../interfaces/error.interface";

const handleValidationError = (
    err: mongoose.Error.ValidationError
): TErrorResponse => {
    const errorSources = Object.values(err.errors).map(
        (error) => ({
            path: error.path,
            message: error.message,
        })
    );

    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};

export default handleValidationError;