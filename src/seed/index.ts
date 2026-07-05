import mongoose from "mongoose";
import { connectDatabase } from "../config/database";
import { seedUsers } from "./users.seed";

const runSeeder = async () => {
    try {
        await connectDatabase();

        console.log("🌱 Seeding started...\n");

        await seedUsers();

        console.log("\n🎉 Seeding completed");

        await mongoose.connection.close();

        process.exit(0);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

runSeeder();