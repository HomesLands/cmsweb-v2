import { userController } from "@controllers";
import { Router } from "express";

export const userRoute: Router = Router();

userRoute.route("/").get(userController.getAllUsers);

export default userRoute;
