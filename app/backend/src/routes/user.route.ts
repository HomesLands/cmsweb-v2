import { upload } from "@configs";
import { userController } from "@controllers";
import { User } from "@entities";
import { Action } from "@enums";
import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";

export const userRoute: Router = Router();

// [GET] /api/v1/users
userRoute.get(
  "/",
  authMiddleware.hasPermission(Action.READ, User),
  userController.getAllUsers
);

// [GET] /api/v1/users/info/permissions
userRoute.get("/info/permissions", userController.getUserPermissions);

// [GET] /api/v1/users/info
userRoute.get("/info", userController.getUser);

// [PATCH] /api/v1/users/info
userRoute.patch("/info", userController.updateUserInfo);

// [PATCH] /api/v1/users/{slug}/username
userRoute.patch("/:slug/username", userController.updateUsername);

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

// [PATCH] /api/v1/users/signature
userRoute.patch("/changePassword", userController.changePassword);

// [DELETE] /api/v1/users/:slug
userRoute.delete("/:slug", userController.deleteUser);
