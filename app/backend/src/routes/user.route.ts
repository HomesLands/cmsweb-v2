import { upload } from "@configs";
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
userRoute.get("/info/permissions", userController.getUserPermissions);

// [GET] /api/v1/users/info
userRoute.get("/info", userController.getUser);

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
