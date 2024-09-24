import { userController } from "@controllers";
import { Router } from "express";

export const userRoute: Router = Router();

// [GET] /api/v1/users
userRoute.get(
  "/",
  // authMiddleware.hasAuthority("READ_USER"),
  userController.getAllUsers
);

// [GET] /api/v1/users/info/permissions
userRoute.route("/info/permissions").get(userController.getUserPermissions);

// [GET] /api/v1/users/info
userRoute.route("/info").get(userController.getUser);
