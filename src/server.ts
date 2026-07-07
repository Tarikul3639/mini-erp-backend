import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(env.PORT, () => {
            console.log(
                `🚀 Server running at http://localhost:${env.PORT}`
            );

            console.log(
                `📚 Swagger: http://localhost:${env.PORT}/api-docs`
            );
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();