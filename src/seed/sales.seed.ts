import { Sale } from "../modules/sales/models/sale.model";
import { Customer } from "../modules/customers/models/customer.model";
import { Product } from "../modules/products/models/product.model";
import { User } from "../modules/users/user.model";
import { UserRole } from "../modules/users/user.types";

export const seedSales = async (): Promise<void> => {
    console.log("🗑 Clearing existing sales...");

    await Sale.deleteMany({});

    // Reset product stock (optional)
    await Product.updateMany({}, { $set: { stockQuantity: 20 } });

    const customers = await Customer.find().limit(10);
    const products = await Product.find().limit(20);
    const employee = await User.findOne({
        role: UserRole.EMPLOYEE,
    });

    if (!customers.length || !products.length || !employee) {
        throw new Error(
            "Seed users, customers and products first."
        );
    }

    const sales = [];

    for (let i = 0; i < 10; i++) {
        const customer = customers[i % customers.length];

        const first = products[(i * 2) % products.length];
        const second = products[(i * 2 + 1) % products.length];

        const qty1 = Math.floor(Math.random() * 3) + 1;
        const qty2 = Math.floor(Math.random() * 2) + 1;

        const items = [
            {
                product: first._id,
                quantity: qty1,
                unitPrice: first.sellingPrice,
                totalPrice: first.sellingPrice * qty1,
            },
            {
                product: second._id,
                quantity: qty2,
                unitPrice: second.sellingPrice,
                totalPrice: second.sellingPrice * qty2,
            },
        ];

        const grandTotal = items.reduce(
            (sum, item) => sum + item.totalPrice,
            0,
        );

        sales.push({
            customer: customer._id,
            products: items,
            grandTotal,
            createdBy: employee._id,
        });

        first.stockQuantity -= qty1;
        second.stockQuantity -= qty2;

        await first.save();
        await second.save();
    }

    await Sale.insertMany(sales);

    console.log("=================================");
    console.log("✅ 10 Sales Seeded Successfully");
    console.log("=================================");
};