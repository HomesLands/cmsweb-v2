import { Router } from "express";

import AuthController from '@controllers/auth.controller';

export const authRoute: Router = Router();

//h
// authRoute.route('/signUp').post(AuthController.signUp);
authRoute.route('/signIn').post(AuthController.authenticate);

//
export default authRoute;