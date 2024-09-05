import { Router } from "express";

import { authController } from "@controllers";

export const authRoute: Router = Router();

// [POST] /api/v1/auth/authenticate
authRoute.route("/authenticate").post(authController.authenticate);

// [POST] /api/v1/auth/register
authRoute.route("/register").post(authController.register);

export default authRoute;
