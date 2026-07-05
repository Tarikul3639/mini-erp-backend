import { body } from "express-validator";

export const createSaleValidation = [
    body("customer")
        .notEmpty()
        .withMessage("Customer is required"),

    body("products")
        .isArray({
            min: 1,
        })
        .withMessage(
            "Products array is required"
        ),

    body("products.*.product")
        .notEmpty(),

    body("products.*.quantity")
        .isInt({
            min: 1,
        }),
];