import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import sendResponse from "../utils/sendResponse";
import v1Routes from "./v1";
import mongoose from "mongoose";

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

router.get("/env-test", (_req, res) => {
    res.json({
        NODE_ENV: process.env.NODE_ENV,
        HAS_MONGODB_URI: !!process.env.MONGODB_URI,
        HAS_JWT_SECRET: !!process.env.JWT_SECRET,
    });
});


router.get("/debug", (_req, res) => {
    console.log("DEBUG ROUTE");

    res.json({
        readyState: mongoose.connection.readyState,
    });
});
router.use("/api/v1", v1Routes);

export default router;