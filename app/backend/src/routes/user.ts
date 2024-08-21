import * as express from "express";
import UserController from "@controllers/user.controller";

const userRoute = express.Router();

userRoute.route('/:id').get(UserController.firstC);
export default userRoute;