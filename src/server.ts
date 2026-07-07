import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {

    console.log("Server file running...");

    await connectDatabase();

    app.listen(env.PORT, () => {
        console.log(
            `🚀 Server running on http://localhost:${env.PORT}`,
            `\n📚 API documentation available at http://localhost:${env.PORT}/api-docs`
        );
    });
};

startServer();