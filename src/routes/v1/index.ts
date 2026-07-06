import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import productRoutes from "../../modules/products/routes/product.routes";
import customerRoutes from "../../modules/customers/routes/customer.routes";
import SaleRoutes from "../../modules/sales/routes/sale.routes";
import dashboardRoutes from "../../modules/dashboard/routes/dashboard.routes";
import { SearchRoutes } from "../../modules/search/routes/search.routes";
import { UserRoutes } from "../../modules/users/routes/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
router.use("/sales", SaleRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/search", SearchRoutes);
router.use("/users", UserRoutes);

export default router;