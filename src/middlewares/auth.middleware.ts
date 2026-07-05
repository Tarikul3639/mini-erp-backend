import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ApiError from "../utils/ApiError";
import { verifyAccessToken } from "../utils/jwt";

import { User } from "../modules/users/user.model";

const auth = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "Authorization header is missing"
            );
        }

        if (!authorization.startsWith("Bearer ")) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "Invalid authorization format"
            );
        }

        const token = authorization.split(" ")[1];

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "User not found"
            );
        }

        if (!user.isActive) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "User account is inactive"
            );
        }

        req.user = {
            userId: user.id,
            role: user.role,
        };

        next();
    } catch (error) {
        next(error);
    }
};

export default auth;