import { Request, Response } from "express";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { SearchService } from "../services/search.service";

export const SearchController = {
    globalSearch: catchAsync(async (req: Request, res: Response) => {
        const result = await SearchService.globalSearch(req.query.q as string);

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Search completed",
            data: result,
        });
    }),
};
