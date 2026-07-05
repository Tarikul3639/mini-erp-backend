import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ApiError from "../utils/ApiError";

import { UserRole } from "../modules/users/user.types";

const authorize =
    (...roles: UserRole[]) =>
    (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "Unauthorized"
            );
        }

        if (!roles.includes(req.user.role)) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "Forbidden"
            );
        }

        next();
    };

export default authorize;