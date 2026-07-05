import { Router } from "express";

import auth from "../../../middlewares/auth.middleware";
import authorize from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../users/user.types";

import { DashboardController } from "../controllers/dashboard.controller";

const router = Router();

router.get(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    DashboardController.getStatistics
);

export default router;