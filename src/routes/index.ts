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
            "\nversion": "1.0.0",
            "\ndocumentation": "/api-docs",
            "\nendpoints": {
                "\nproducts": "/api/v1/products",
                "\ncustomers": "/api/v1/customers",
                "\nsales": "/api/v1/sales",
                "\nsearch": "/api/v1/search",
            },
        },
    });
});

router.get("/env-test", (_req, res) => {
    res.json({
        "\nNODE_ENV": process.env.NODE_ENV,
        "\nHAS_MONGODB_URI": !!process.env.MONGODB_URI,
        "\nHAS_JWT_SECRET": !!process.env.JWT_SECRET,
    });
});

router.use("/api/v1", v1Routes);

export default router;