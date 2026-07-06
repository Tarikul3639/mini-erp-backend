import { Customer } from "../../customers/models/customer.model";
import { Product } from "../../products/models/product.model";
import { Sale } from "../../sales/models/sale.model";

export const SearchService = {
    async globalSearch(search: string) {
        const keyword = search.trim();

        if (!keyword) {
            return {
                products: [],
                customers: [],
                sales: [],
            };
        }

        const regex = new RegExp(keyword, "i");

        const [products, customers, sales] = await Promise.all([
            Product.find({
                $or: [
                    {
                        name: regex,
                    },
                    {
                        sku: regex,
                    },
                ],
            })
                .select("name sku image")
                .limit(5)
                .lean(),

            Customer.find({
                $or: [
                    {
                        name: regex,
                    },
                    {
                        phone: regex,
                    },
                ],
            })
                .select("name phone")
                .limit(5)
                .lean(),

            Sale.find()
                .populate("customer", "name")
                .sort({
                    createdAt: -1,
                })
                .limit(20)
                .lean(),
        ]);

        const filteredSales = sales
            .filter((sale) => {
                const customer = sale.customer as unknown as {
                    _id: string;
                    name: string;
                };

                return customer.name
                    .toLowerCase()
                    .includes(keyword.toLowerCase());
            })
            .slice(0, 5);

        return {
            products,
            customers,
            sales: filteredSales,
        };
    },
};
