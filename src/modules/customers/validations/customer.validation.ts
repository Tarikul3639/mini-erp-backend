import { body } from "express-validator";

export const createCustomerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Customer name is required"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email"),
];

export const updateCustomerValidation = [
    body("name").optional().trim(),

    body("phone").optional().trim(),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email"),
];