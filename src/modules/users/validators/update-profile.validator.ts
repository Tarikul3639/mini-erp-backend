import { body } from "express-validator";

export const updateProfileValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Name must be between 2 and 100 characters"
        ),
];