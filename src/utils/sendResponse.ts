import { Response } from "express";

interface TMeta {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
}

interface TResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: TMeta;
    data?: T;
}

const sendResponse = <T>(
    res: Response,
    payload: TResponse<T>
): Response => {
    const {
        statusCode,
        success,
        message,
        meta,
        data,
    } = payload;

    return res.status(statusCode).json({
        success,
        message,
        meta,
        data,
    });
};

export default sendResponse;