import { NextFunction, Request, Response } from "express";

import ApiError from "../utils/ApiError";

const globalErrorHandler = (
    err: Error | ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong";

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? err : undefined,
    });
};

export default globalErrorHandler;