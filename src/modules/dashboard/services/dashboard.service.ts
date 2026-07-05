import { Customer } from "../../customers/models/customer.model";
import { Product } from "../../products/models/product.model";
import { Sale } from "../../sales/models/sale.model";

export const DashboardService = {
    async getStatistics() {
        const [
            totalProducts,
            totalCustomers,
            totalSales,
            lowStockProducts,
        ] = await Promise.all([
            Product.countDocuments(),

            Customer.countDocuments(),

            Sale.countDocuments(),

            Product.find({
                stockQuantity: {
                    $lt: 5,
                },
            })
                .select(
                    "name sku stockQuantity sellingPrice image"
                )
                .sort("stockQuantity"),
        ]);

        return {
            totalProducts,
            totalCustomers,
            totalSales,
            lowStockProducts,
        };
    },
};