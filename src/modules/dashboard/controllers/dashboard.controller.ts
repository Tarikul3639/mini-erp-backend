import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { DashboardService } from "../services/dashboard.service";

export const DashboardController = {
    getStatistics: catchAsync(
        async (_req: Request, res: Response) => {
            const result =
                await DashboardService.getStatistics();

            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message:
                    "Dashboard statistics retrieved successfully",
                data: result,
            });
        }
    ),
};