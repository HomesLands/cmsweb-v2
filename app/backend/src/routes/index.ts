import { Express, Router, Request, Response, NextFunction } from "express";

import { authRoute } from "@routes/auth.route";
import { productRoute } from "@routes/product.route";
import { userRoute } from "@routes/user.route";
import { healthCheckRoute } from "./health-check.route";

const baseApi: Router = Router();

export const registerRoutes = (app: Express) => {
  baseApi.use("/auth", authRoute);

  baseApi.use("/users", userRoute);

  baseApi.use("/products", productRoute);

  baseApi.use("/healthCheck", healthCheckRoute);

  app.use("/api/v1", baseApi);
};
