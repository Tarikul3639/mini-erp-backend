import { hashPassword } from "../utils/bcrypt";

import { User } from "../modules/users/user.model";
import { UserRole } from "../modules/users/user.types";

export const seedUsers = async (): Promise<void> => {
    console.log("🗑 Clearing existing users...");

    await User.deleteMany({});

    const users = [
        {
            name: "System Admin",
            email: "admin@erp.com",
            password: "Admin123@",
            role: UserRole.ADMIN,
        },

        {
            name: "Sales Manager",
            email: "manager@erp.com",
            password: "Manager123@",
            role: UserRole.MANAGER,
        },

        {
            name: "Employee 1",
            email: "employee1@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 2",
            email: "employee2@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 3",
            email: "employee3@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 4",
            email: "employee4@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 5",
            email: "employee5@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 6",
            email: "employee6@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 7",
            email: "employee7@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },

        {
            name: "Employee 8",
            email: "employee8@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },
    ];

    const payload = await Promise.all(
        users.map(async (user) => ({
            ...user,
            password: await hashPassword(user.password),
        })),
    );

    await User.insertMany(payload);

    console.log("=================================");
    console.log("✅ Database seeded successfully!");
    console.log("=================================");
    console.log("Admin    : admin@erp.com / Admin123@");
    console.log("Manager  : manager@erp.com / Manager123@");
    console.log("Employees: employee1@erp.com ~ employee8@erp.com");
    console.log("Password : Employee123@");
}