import { body } from "express-validator";

export const createProductValidation = [
    body("name").trim().notEmpty().withMessage("Product name is required"),

    body("sku").trim().notEmpty().withMessage("SKU is required"),

    body("category").notEmpty().withMessage("Category is required"),

    body("purchasePrice")
        .isFloat({ min: 0 })
        .withMessage("Purchase price must be a positive number"),

    body("sellingPrice")
        .isFloat({ min: 0 })
        .withMessage("Selling price must be a positive number"),

    body("stockQuantity")
        .isInt({ min: 0 })
        .withMessage("Stock quantity must be a positive integer"),
];

export const updateProductValidation = [
    body("name").optional().trim(),

    body("sku").optional().trim(),

    body("purchasePrice")
        .optional()
        .isFloat({ min: 0 }),

    body("sellingPrice")
        .optional()
        .isFloat({ min: 0 }),

    body("stockQuantity")
        .optional()
        .isInt({ min: 0 }),
];
