import 'reflect-metadata';
import 'tsconfig-paths/register';

import express, { Express, Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';

import registerRoutes from '@routes';
import globalErrorHandler from '@middlewares/globalErrorHandler';
import myDataSource from '@configs/database';
import passportStrategies from '@configs/passport';



dotenv.config();

(async () => {
  const app: Express = express();
  app.use(express.json())
  const port: number | string = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, '../public')));
  // app.use(express.static('public'));

  app.use(express.urlencoded({ extended: true }));


  await myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    });

  // Config CORS
  app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Config logger
  if ( process.env.NODE_ENV === "production" ) {
    const logDirectory = path.resolve("logs");
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    const logPath = path.join(process.cwd(), "/logs/access.log");
    const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });
    app.use(morgan("combined", { stream: accessLogStream }));

  } else if ( process.env.NODE_ENV === "development" ) {
    app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));
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
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ["./src/controllers/*.ts"],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Passport initialization
  passportStrategies(app);
  
  // routes
  registerRoutes(app);

  app.all("*", ( req: Request, res: Response, next: NextFunction) => {
    let err = new Error(`Can't not find ${req.originalUrl}`);
    next(err);
  })

  
  // Global error handling
  app.use(globalErrorHandler);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})();