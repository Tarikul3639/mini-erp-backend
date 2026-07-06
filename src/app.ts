import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import { swaggerSpec } from "./config/swagger";

import notFoundHandler from "./middlewares/notFound.middleware";
import globalErrorHandler from "./middlewares/error.middleware";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// API Routes
app.use(routes);

// 404
app.use(notFoundHandler);

// Global Error
app.use(globalErrorHandler);

export default app;