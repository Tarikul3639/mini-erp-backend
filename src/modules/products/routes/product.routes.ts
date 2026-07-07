import { Router } from "express";

import auth from "../../../middlewares/auth.middleware";
import authorize from "../../../middlewares/authorize.middleware";
import { upload } from "../../../middlewares/upload.middleware";

import { UserRole } from "../../users/user.types";

import { ProductController } from "../controllers/product.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { updateProductValidation } from "../validations/product.validation";

const router = Router();

router.post(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    upload.single("image"),
    ProductController.createProduct
);

router.get(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.EMPLOYEE
    ),
    ProductController.getProducts
);

router.get(
    "/:id",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.EMPLOYEE
    ),
    ProductController.getProduct
);

router.patch(
    "/:id",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    upload.single("image"),
    updateProductValidation,
    validateRequest,
    ProductController.updateProduct
);

router.delete(
    "/:id",
    auth,
    authorize(UserRole.ADMIN),
    ProductController.deleteProduct
);
export default router;