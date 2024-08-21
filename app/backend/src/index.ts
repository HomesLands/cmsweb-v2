import 'tsconfig-paths/register';
import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";

import registerRoutes from '@routes/index';

dotenv.config();

(async () => {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  //logger
  app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CMS Swagger",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ["./src/controllers/*.ts"],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  registerRoutes(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})();