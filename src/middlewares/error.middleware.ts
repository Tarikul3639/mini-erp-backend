import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import ApiError from "../utils/ApiError";

import handleCastError from "../utils/handleCastError";
import handleDuplicateError from "../utils/handleDuplicateError";
import handleValidationError from "../utils/handleValidationError";

import { TErrorSource } from "../interfaces/error.interface";

const globalErrorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong";

    let errorSources: TErrorSource[] = [];

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = err.errorSources;
    }

    else if (err instanceof mongoose.Error.ValidationError) {
        const simplifiedError =
            handleValidationError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources =
            simplifiedError.errorSources;
    }

    else if (err instanceof mongoose.Error.CastError) {
        const simplifiedError =
            handleCastError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources =
            simplifiedError.errorSources;
    }

    else if (
        err instanceof mongoose.mongo.MongoServerError &&
        err.code === 11000
    ) {
        const simplifiedError =
            handleDuplicateError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources =
            simplifiedError.errorSources;
    }

    else {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};

export default globalErrorHandler;