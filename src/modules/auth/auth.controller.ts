import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AuthService } from "./auth.service";

export const AuthController = {
    login: catchAsync(async (req, res) => {
        const result = await AuthService.login(req.body);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Login successful",
            data: result,
        });
    }),

    me: catchAsync(async (req: Request, res: Response) => {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Current user",
            data: req.user,
        });
    }),

    changePassword: catchAsync(
        async (
            req: Request,
            res: Response
        ) => {
            await AuthService.changePassword(
                req.user!.userId,
                req.body
            );

            sendResponse(res, {
                success: true,
                statusCode:
                    StatusCodes.OK,
                message:
                    "Password changed successfully",
                data: null,
            });
        }
    ),
};