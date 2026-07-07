import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

import { CustomerService } from "../services/customer.service";

export const CustomerController = {
    createCustomer: catchAsync(async (req: Request, res: Response) => {
        const result = await CustomerService.createCustomer(req.body);

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "Customer created successfully",
            data: result,
        });
    }),

    // Get Customers with pagination and search
    getCustomers: catchAsync(async (req: Request, res: Response) => {
        const result = await CustomerService.getCustomers(req.query);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Customers retrieved successfully",
            meta: result.meta,
            data: result.data,
        });
    }),

    // Get Single Customer
    getCustomer: catchAsync(async (req: Request, res: Response) => {
        const result = await CustomerService.getCustomer(req.params.id as string);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Customer retrieved successfully",
            data: result,
        });
    }),

    // Update Customer
    updateCustomer: catchAsync(async (req: Request, res: Response) => {
        const result = await CustomerService.updateCustomer(
            req.params.id as string,
            req.body,
        );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Customer updated successfully",
            data: result,
        });
    }),

    // Delete Customer
    deleteCustomer: catchAsync(async (req: Request, res: Response) => {
        await CustomerService.deleteCustomer(req.params.id as string);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Customer deleted successfully",
            data: null,
        });
    }),
};
