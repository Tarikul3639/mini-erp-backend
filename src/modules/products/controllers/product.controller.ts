import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { ProductService } from "../services/product.service";

export const ProductController = {
    createProduct: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await ProductService.createProduct(
                    req.body,
                    req.file
                );

            sendResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: "Product created successfully",
                data: result,
            });
        }
    ),

    // Get Products with pagination, filtering, and sorting
    getProducts: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await ProductService.getProducts(
                    req.query
                );

            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "Products retrieved successfully",
                meta: result.meta,
                data: result.data,
            });
        }
    ),

    // Get a single product by ID
    getProduct: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await ProductService.getProduct(
                    req.params.id as string
                );

            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "Product retrieved successfully",
                data: result,
            });
        }
    ),

    updateProduct: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await ProductService.updateProduct(
                    req.params.id as string,
                    req.body,
                    req.file
                );

            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "Product updated successfully",
                data: result,
            });
        }
    ),


    deleteProduct: catchAsync(
        async (req: Request, res: Response) => {
            await ProductService.deleteProduct(req.params.id as string);

            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "Product deleted successfully",
                data: null,
            });
        }
    ),
};