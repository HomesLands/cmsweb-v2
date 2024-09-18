import { userController } from "@controllers";
import { Router } from "express";

export const userRoute: Router = Router();

// [GET] /api/v1/users
userRoute.route("/").get(userController.getAllUsers);

// [GET] /api/v1/users/{slug}
userRoute.route("/:slug").get(userController.getUserBySlug);
