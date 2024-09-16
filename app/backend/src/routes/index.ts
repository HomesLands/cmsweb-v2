import { Express, Router, Request, Response, NextFunction } from "express";

import { authRoute } from "@routes/auth.route";
import { productRoute } from "@routes/product.route";
import { userRoute } from "@routes/user.route";
import { healthCheckRoute } from "@routes/health-check.route";
import { siteRoute } from "@routes/site.route";
import { projectRoute } from "@routes/project.route";

import { authMiddleware } from "@middlewares";
import { ErrorCodes, GlobalError } from "@exception";
import { StatusCodes } from "http-status-codes";
import { errorCodeRoute } from "./error-code.route";

const baseApi: Router = Router();

export const registerRoutes = (app: Express) => {
  baseApi.use(authMiddleware.authenticate);

  baseApi.use("/auth", authRoute);

  baseApi.use("/users", userRoute);

  baseApi.use("/products", productRoute);

  baseApi.use("/sites", siteRoute);

  baseApi.use("/projects", projectRoute);

  baseApi.use("/healthCheck", healthCheckRoute);

  baseApi.use("/errorCodes", errorCodeRoute);

  app.use("/api/v1", baseApi);

  app.options("*", (req: Request, res: Response) => res.status(StatusCodes.OK));

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new GlobalError(ErrorCodes.PATH_NOT_FOUND);
    next(err);
  });
};
