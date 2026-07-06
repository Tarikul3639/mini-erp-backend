import { Router } from "express";
import multer from "multer";

import auth from "../../../middlewares/auth.middleware";
import validateRequest from "../../../middlewares/validateRequest";

import { UserController } from "../controllers/user.controller";

import { updateProfileValidator } from "../validators/update-profile.validator";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.get(
    "/profile",
    auth,
    UserController.getProfile,
);

router.patch(
    "/profile",
    auth,
    upload.single("avatar"),
    updateProfileValidator,
    validateRequest,
    UserController.updateProfile,
);

export const UserRoutes = router;