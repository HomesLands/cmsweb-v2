import { Express, Router } from "express";

import { authRoute } from "@routes/auth.route";
import { productRoute } from "@routes/product.route";
import { userRoute } from "@routes/user.route";

const baseApi: Router = Router();

export const registerRoutes = (app: Express) => {
  baseApi.use("/auth", authRoute);

  baseApi.use("/users", userRoute);

  baseApi.use("/products", productRoute);

  app.use("/api/v1", baseApi);
};
