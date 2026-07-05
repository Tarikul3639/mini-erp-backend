import { NextFunction, Request, Response } from "express";

const auth = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    /**
     * Flow
     *
     * Authorization Header
     * ↓
     * Verify JWT
     * ↓
     * Find User
     * ↓
     * req.user
     * ↓
     * next()
     */

    next();
};

export default auth;