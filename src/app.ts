import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

import notFoundHandler from "./middlewares/notFound.middleware";
import globalErrorHandler from "./middlewares/error.middleware";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app: Application = express();

app.use(helmet());

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Swagger
app.use(
    "/api-docs",
    swaggerUi.serveFiles(swaggerSpec),
    swaggerUi.setup(swaggerSpec)
);

// 404
app.use(notFoundHandler);

// Global Error
app.use(globalErrorHandler);

export default app;