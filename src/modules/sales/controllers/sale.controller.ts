import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { SaleService } from "../services/sale.service";

export const SaleController = {
    createSale: catchAsync(
        async (req, res) => {
            const result =
                await SaleService.createSale(
                    req.body,
                    req.user!.userId
                );

            sendResponse(res, {
                statusCode: 201,
                success: true,
                message:
                    "Sale created successfully",

                data: result,
            });
        }
    ),

    // Get Sales with pagination, filtering, and sorting
    getSales: catchAsync(async (req, res) => {
        const result = await SaleService.getSales(req.query);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Sales retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }),
}