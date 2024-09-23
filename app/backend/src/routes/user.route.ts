import { userController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { Router } from "express";

export const userRoute: Router = Router();

// [GET] /api/v1/users
userRoute.get(
  "/",
  // authMiddleware.hasAuthority("READ_USER"),
  userController.getAllUsers
);

// [GET] /api/v1/users/{slug}
userRoute.route("/:slug").get(userController.getUserBySlug);
