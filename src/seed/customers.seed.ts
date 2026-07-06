import { Customer } from "../modules/customers/models/customer.model";

export const seedCustomers = async (): Promise<void> => {
    console.log("🗑 Clearing existing customers...");

    await Customer.deleteMany({});

    const customers = [
        {
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "01710000001",
            address: "Dhaka",
        },
        {
            name: "Emma Johnson",
            email: "emma.johnson@example.com",
            phone: "01710000002",
            address: "Chattogram",
        },
        {
            name: "Michael Brown",
            email: "michael.brown@example.com",
            phone: "01710000003",
            address: "Khulna",
        },
        {
            name: "Sophia Davis",
            email: "sophia.davis@example.com",
            phone: "01710000004",
            address: "Rajshahi",
        },
        {
            name: "William Wilson",
            email: "william.wilson@example.com",
            phone: "01710000005",
            address: "Sylhet",
        },
        {
            name: "Olivia Moore",
            email: "olivia.moore@example.com",
            phone: "01710000006",
            address: "Barishal",
        },
        {
            name: "James Taylor",
            email: "james.taylor@example.com",
            phone: "01710000007",
            address: "Cumilla",
        },
        {
            name: "Charlotte Anderson",
            email: "charlotte.anderson@example.com",
            phone: "01710000008",
            address: "Rangpur",
        },
        {
            name: "Benjamin Thomas",
            email: "benjamin.thomas@example.com",
            phone: "01710000009",
            address: "Mymensingh",
        },
        {
            name: "Amelia Jackson",
            email: "amelia.jackson@example.com",
            phone: "01710000010",
            address: "Gazipur",
        },
    ];

    await Customer.insertMany(customers);

    console.log("=================================");
    console.log("✅ 10 Customers Seeded Successfully");
    console.log("=================================");
};