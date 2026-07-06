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


    // Get a single Sale by ID
    getSale: catchAsync(async (req, res) => {
        const result =
            await SaleService.getSale(
                req.params.id as string
            );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Sale retrieved successfully",
            data: result,
        });
    }),


    // Delete a Sale by ID
    deleteSale: catchAsync(async (req, res) => {
        await SaleService.deleteSale(req.params.id as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Sale deleted successfully",
            data: null,
        });
    }),
}