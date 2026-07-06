import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { UserService } from "../services/user.service";

export const UserController = {
    getProfile: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await UserService.getProfile(
                    req.user!.userId
                );

            sendResponse(res, {
                success: true,
                statusCode:
                    StatusCodes.OK,
                message:
                    "Profile retrieved successfully",
                data: result,
            });
        }
    ),

    updateProfile: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await UserService.updateProfile(
                    req.user!.userId,
                    req.body,
                    req.file
                );

            sendResponse(res, {
                success: true,
                statusCode:
                    StatusCodes.OK,
                message:
                    "Profile updated successfully",
                data: result,
            });
        }
    ),
};