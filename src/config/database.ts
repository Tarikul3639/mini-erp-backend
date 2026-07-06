import mongoose from "mongoose";
import { env } from "./env";

export const connectDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error);

        throw error;
    }
};