import express, {
    Application,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";

import { swaggerSpec } from "./config/swagger";
import { connectDatabase } from "./config/database";

import notFoundHandler from "./middlewares/notFound.middleware";
import globalErrorHandler from "./middlewares/error.middleware";

const app: Application = express();

app.use(helmet());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://classicit-erp.vercel.app",
        ],
        credentials: true,
    })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

// Ensure MongoDB connection (Vercel Serverless)
app.use(async (_req, _res, next) => {
    try {
        await connectDatabase();

        next();
    } catch (error) {
        next(error);
    }
});

// Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/api-docs.json", (_req, res) => {
    res.json(swaggerSpec);
});

// API Routes
app.use(routes);

// 404
app.use(notFoundHandler);

// Global Error
app.use(globalErrorHandler);

export default app;