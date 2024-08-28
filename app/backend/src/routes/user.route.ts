import { Router } from "express";
import UserController from "@controllers/user.controller";

const userRoute: Router = Router();

userRoute.route('/test').get(UserController.firstC);
userRoute.route('/upload').post(UserController.uploadTestSaveLocal);
userRoute.route('/uploadDB').post(UserController.uploadTestSaveDB);
userRoute.route('/img/:id').get(UserController.getImage);

userRoute.route('/register').post(UserController.registerUser);
userRoute.route('/:id').get(UserController.getUser);
export default userRoute;