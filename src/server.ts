import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

const startServer = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect MongoDB");
        console.error(error);

        process.exit(1);
    }
};

startServer();