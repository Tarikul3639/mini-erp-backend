import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import sendResponse from "../utils/sendResponse";

const router = Router();

router.get("/", (_req, res) => {
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Mini ERP API is running 🚀",
        data: null,
    });
});

export default router;