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
            recentSales,
            allSales,
        ] = await Promise.all([
            Product.countDocuments(),

            Customer.countDocuments(),

            Sale.countDocuments(),

            Product.find({
                stockQuantity: {
                    $lt: 5,
                },
            })
                .select("name sku stockQuantity sellingPrice image")
                .sort({
                    stockQuantity: 1,
                }),

            Sale.find()
                .populate("customer", "name")
                .populate("products.product", "name image sku sellingPrice")
                .sort({
                    createdAt: -1,
                })
                .limit(5)
                .lean(),

            Sale.find()
                .populate("products.product", "name image sku sellingPrice")
                .lean(),
        ]);

        let totalRevenue = 0;

        const monthlySalesMap = new Map<number, number>();

        const topSellingMap = new Map<
            string,
            {
                _id: string;
                quantity: number;
                product: any;
            }
        >();

        for (const sale of allSales) {
            totalRevenue += sale.grandTotal;

            const month = new Date(sale.createdAt).getMonth() + 1;

            monthlySalesMap.set(
                month,
                (monthlySalesMap.get(month) ?? 0) + sale.grandTotal,
            );

            for (const item of sale.products) {
                const id = String(item.product._id);

                if (topSellingMap.has(id)) {
                    topSellingMap.get(id)!.quantity += item.quantity;
                } else {
                    topSellingMap.set(id, {
                        _id: id,

                        quantity: item.quantity,

                        product: item.product,
                    });
                }
            }
        }

        const monthlySales = Array.from(monthlySalesMap.entries())
            .map(([month, revenue]) => ({
                _id: month,
                revenue,
            }))
            .sort((a, b) => a._id - b._id);

        const topSellingProducts = Array.from(topSellingMap.values())
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        return {
            totalProducts,
            totalCustomers,
            totalSales,
            totalRevenue,
            lowStockProducts,
            recentSales,
            monthlySales,
            topSellingProducts,
        };
    },
};
