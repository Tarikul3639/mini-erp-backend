import { hashPassword } from "../utils/bcrypt";

import { User } from "../modules/users/user.model";
import { UserRole } from "../modules/users/user.types";

export const seedUsers = async (): Promise<void> => {
    const users = [
        {
            name: "System Admin",
            email: "admin@erp.com",
            password: "Admin123@",
            role: UserRole.ADMIN,
        },
        {
            name: "Manager",
            email: "manager@erp.com",
            password: "Manager123@",
            role: UserRole.MANAGER,
        },
        {
            name: "Employee",
            email: "employee@erp.com",
            password: "Employee123@",
            role: UserRole.EMPLOYEE,
        },
    ];

    for (const user of users) {
        const exists = await User.findOne({
            email: user.email,
        });

        if (exists) {
            console.log(`✔ ${user.email} already exists`);
            continue;
        }

        const hashedPassword = await hashPassword(
            user.password
        );

        await User.create({
            ...user,
            password: hashedPassword,
        });

        console.log(`✅ ${user.email} created`);
    }
};