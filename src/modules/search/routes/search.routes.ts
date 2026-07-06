import { Router } from "express";

import auth from "../../../middlewares/auth.middleware";
import authorize from "../../../middlewares/authorize.middleware";

import { UserRole } from "../../users/user.types";

import { SearchController } from "../controllers/search.controller";

const router = Router();

router.get(
    "/",
    auth,
    authorize(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.EMPLOYEE,
    ),
    SearchController.globalSearch,
);

export const SearchRoutes = router;