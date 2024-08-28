import { Router } from "express";

import { authController } from "@controllers";

export const authRoute: Router = Router();
// authRoute.route("/signUp").post(authController.signUp);
authRoute.route("/authenticate").post(authController.authenticate);
