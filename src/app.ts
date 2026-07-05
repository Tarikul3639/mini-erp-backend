import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app: Application = express();

// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Mini ERP API is running 🚀",
    });
});

export default app;