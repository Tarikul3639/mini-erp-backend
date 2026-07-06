import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import sendResponse from "../utils/sendResponse";
import v1Routes from "./v1";

const router = Router();

router.get("/", (_req, res) => {
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Mini ERP API is running 🚀",
        data: {
            "version": "1.0.0",
            "documentation": "/api-docs",
            "endpoints": {
                "products": "/api/v1/products",
                "customers": "/api/v1/customers",
                "sales": "/api/v1/sales",
                "search": "/api/v1/search",
            },
        },
    });
});

router.use("/api/v1", v1Routes);

export default router;