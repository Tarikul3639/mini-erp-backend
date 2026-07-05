import mongoose from "mongoose";

import { TErrorResponse } from "../interfaces/error.interface";

const handleCastError = (
    err: mongoose.Error.CastError
): TErrorResponse => {
    return {
        statusCode: 400,
        message: "Invalid Object Id",
        errorSources: [
            {
                path: err.path,
                message: err.message,
            },
        ],
    };
};

export default handleCastError;