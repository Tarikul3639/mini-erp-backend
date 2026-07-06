import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "Mini ERP API",
            version: "1.0.0",
            description:
                "REST API documentation for the Mini ERP - Inventory & Sales Management System.",
            contact: {
                name: "Tarikul Islam",
                email: "admin@erp.com",
            },
        },

        servers: [
            {
                url: "http://localhost:5000/api/v1",
                description: "Development Server",
            },
            {
                url: "https://classicit-inventory-api.vercel.app/api/v1",
                description: "Production Server",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description:
                        "Enter JWT token in the format: Bearer <token>",
                },
            },

            schemas: {
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        message: {
                            type: "string",
                            example: "Unauthorized",
                        },
                    },
                },

                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true,
                        },
                        message: {
                            type: "string",
                            example: "Success",
                        },
                    },
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/**/*.docs.ts",
        "./src/**/*.routes.ts",
    ],
};

export const swaggerSpec = swaggerJsdoc(options);