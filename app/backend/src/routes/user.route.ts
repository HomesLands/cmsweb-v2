import { upload } from "@configs";
import { userController } from "@controllers";
import { User } from "@entities";
import { Action } from "@enums";
import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";

export const userRoute: Router = Router();

// [GET] /api/v1/users
userRoute.get("/", userController.getAllUsers);

// [GET] /api/v1/users/info/permissions
userRoute.get("/info/permissions", userController.getUserPermissions);

// [GET] /api/v1/users/info
userRoute.get(
  "/info",
  authMiddleware.hasPermission(Action.READ, User),
  userController.getUser
);

// [PATCH] /api/v1/users/signature
userRoute.patch(
  "/upload/sign",
  upload.single("file"),
  userController.uploadUserSignature
);

// [PATCH] /api/v1/users/avatar
userRoute.patch(
  "/upload/avatar",
  upload.single("file"),
  userController.uploadUserAvatar
);
