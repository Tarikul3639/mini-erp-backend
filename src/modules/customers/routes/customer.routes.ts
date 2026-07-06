import { Router } from "express";

import auth from "../../../middlewares/auth.middleware";
import authorize from "../../../middlewares/authorize.middleware";
import validateRequest from "../../../middlewares/validateRequest";

import { UserRole } from "../../users/user.types";
import { CustomerController } from "../controllers/customer.controller";

import {
    createCustomerValidation,
    updateCustomerValidation,
} from "../validations/customer.validation";

const router = Router();

router.post(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    createCustomerValidation,
    validateRequest,
    CustomerController.createCustomer
);

router.get(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.EMPLOYEE
    ),
    CustomerController.getCustomers
);

router.patch(
    "/:id",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    updateCustomerValidation,
    validateRequest,
    CustomerController.updateCustomer
);

export default router;