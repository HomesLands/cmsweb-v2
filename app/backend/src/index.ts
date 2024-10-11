import "reflect-metadata";
import "tsconfig-paths/register";

import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

import { registerRoutes } from "@routes";
import { errorHandlerMiddleware } from "@middlewares";
import {
  passportStrategies,
  initializeDataSource,
  registerSwagger,
  registerMorgan,
} from "@configs";
import { logger } from "@lib";

dotenv.config();

(async () => {
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));

  // ejs
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // await producer.connect();
  // await producer.send({
  //   topic: "first_kafka_topic",
  //   //convert value to a JSON string and send it
  //   messages: [{ value: "Hello" }],
  // });
  // console.log("producer connected successfully");

  // await consumer.connect();
  // await consumer.subscribe({ topic: "first_kafka_topic", fromBeginning: true });
  // await consumer.run({
  //   eachMessage: async ({ message }) => {
  //     console.log("****************** Arrived in Consumer ******************");
  //     console.log({ message: message.value?.toString() });
  //   },
  // });

  // Config database
  // Default auto retries 5
  await initializeDataSource();

  // Config CORS
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://tbecms.cmsiot.net"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      preflightContinue: true,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Morgan
  registerMorgan(app);

  // Swagger
  registerSwagger(app);

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
