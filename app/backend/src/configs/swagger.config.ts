import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { env } from "@constants";
import { isDevEnvironment } from "heppers";

const getServers = (): {
  description: string;
  url: string;
}[] => {
  const servers = [];
  if (isDevEnvironment())
    servers.push({
      description: "development",
      url: `http://localhost:${env.port}/api/v1`,
    });
  else
    servers.push({
      description: "production",
      url: "https://tbecms.cmsiot.online/api/v1",
    });
  return servers;
};

export const registerSwagger = (app: Application) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CMS API Documentation",
        version: "1.0.0",
        description:
          "CMSWeb for Warehouse Management System is a comprehensive, web-based content management solution designed specifically to optimize warehouse operations. It streamlines the management of inventory, order processing, and real-time data tracking, providing users with an intuitive interface for efficient workflow control.",
      },
      servers: getServers(),
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Optional, but recommended for clarity
          },
        },
      },
      security: [
        {
          bearerAuth: [], // Apply the bearer authentication globally
        },
      ],
    },
    apis: ["./src/controllers/*.ts"],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
