import "reflect-metadata";
import "tsconfig-paths/register";

import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";

import { registerRoutes } from "@routes";
import { errorHandlerMiddleware } from "@middlewares";
import { passportStrategies, dataSource } from "@configs";
import { isDevEnvironment } from "heppers";
import { logger } from "@lib";

dotenv.config();

(async () => {
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));

  // Config database
  await dataSource
    .initialize()
    .then(() => {
      logger.info("Data Source has been initialized!");
    })
    .catch((err) => {
      logger.error("Error during Data Source initialization:", err);
    });

  // Config CORS
  app.use(
    cors({
      origin: "*",
      methods: "*",
      preflightContinue: true,
      optionsSuccessStatus: 200,
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Config logger
  if (!isDevEnvironment()) {
    const logDirectory = path.resolve("logs");
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    const logPath = path.join(process.cwd(), "/logs/access.log");
    const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });
    app.use(morgan("combined", { stream: accessLogStream }));
  } else if (isDevEnvironment()) {
    // Custom token for date formatting
    morgan.token("custom-date", () => {
      return moment().format("YYYY-MM-DD HH:mm:ss");
    });

    app.use(morgan(":custom-date [:method] :url :status"));
  }

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CMS Swagger",
        version: "1.0.0",
      },
      servers: [
        {
          name: "localhost",
          url: `http://localhost:${port}/api/v1`,
        },
        {
          name: "development",
          url: `https://tbecms.cmsiot.online/api/v1`,
        },
      ],
    },
    apis: ["./src/controllers/*.ts"],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Passport initialization
  passportStrategies(app);

  // routes
  registerRoutes(app);

  // Global error handling
  app.use(errorHandlerMiddleware.handler);

  app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
    logger.info(
      `[server]: Swagger is running at http://localhost:${port}/api/api-docs`
    );
  });
})();
