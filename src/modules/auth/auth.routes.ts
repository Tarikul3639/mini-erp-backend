import { Router } from "express";

import auth from "../../middlewares/auth.middleware";
import validateRequest from "../../middlewares/validateRequest";

import { AuthController } from "./auth.controller";
import { loginValidation } from "./auth.validation";

const router = Router();

router.post(
    "/login",
    loginValidation,
    validateRequest,
    AuthController.login
);

router.get("/me", auth, AuthController.me);

export default router;