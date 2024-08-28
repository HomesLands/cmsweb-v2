import { Router } from "express";

import AuthController from '@controllers/auth.controller';

const authRoute: Router = Router();

authRoute.route('/signUp').post(AuthController.signUp);
authRoute.route('/signIn').post(AuthController.signIn);

export default authRoute;