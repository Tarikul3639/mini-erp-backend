import { Router } from "express";
import { body } from "express-validator";

import auth from "../../middlewares/auth.middleware";
import validateRequest from "../../middlewares/validateRequest";

import { AuthController } from "./auth.controller";
import { loginValidation } from "./auth.validation";

const router = Router();

router.post("/login", loginValidation, validateRequest, AuthController.login);

router.get("/me", auth, AuthController.me);

router.patch(
    "/change-password",
    auth,

    [
        body("currentPassword")
            .notEmpty()
            .withMessage("Current password is required"),

        body("newPassword")
            .isLength({
                min: 6,
            })
            .withMessage("Password must be at least 6 characters"),
    ],

    validateRequest,

    AuthController.changePassword,
);

export default router;
