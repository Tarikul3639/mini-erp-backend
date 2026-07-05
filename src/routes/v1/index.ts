import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import auth from "../../middlewares/auth.middleware";
import productRoutes from "../../modules/products/routes/product.routes";
import customerRoutes from "../../modules/customers/routes/customer.routes";
import SaleRoutes from "../../modules/sales/routes/sale.routes";
import dashboardRoutes from "../../modules/dashboard/routes/dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
router.use("/sales", SaleRoutes);
router.use("/dashboard", dashboardRoutes);

router.get(
    "/profile",
    auth,
    (req, res) => {
        res.json(req.user);
    }
);

export default router;