import { Router } from "express";

import auth from "../../../middlewares/auth.middleware";
import authorize from "../../../middlewares/authorize.middleware";
import validateRequest from "../../../middlewares/validateRequest";

import { UserRole } from "../../users/user.types";
import { SaleController } from "../controllers/sale.controller";

import {
    createSaleValidation,
} from "../validations/sale.validation";

const router = Router();

router.post(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.EMPLOYEE
    ),
    createSaleValidation,
    validateRequest,
    SaleController.createSale
);

router.get(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    SaleController.getSales
);

export default router;