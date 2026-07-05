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
        data: null,
    });
});

router.use("/api/v1", v1Routes);

export default router;