import { Router } from "express";

import { authController } from "@controllers";

export const authRoute: Router = Router();

// [POST] /api/v1/auth/authenticate
authRoute.route("/authenticate").post(authController.authenticate);

export default authRoute;
