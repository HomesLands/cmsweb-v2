import { Router } from "express";
import { userController } from "@controllers";

export const userRoute: Router = Router();

// userRoute.route("/upload").post(userController.uploadTestSaveLocal);
// userRoute.route("/uploadDB").post(userController.uploadTestSaveDB);
// userRoute.route("/img/:id").get(userController.getImage);
// userRoute.route("/register").post(userController.registerUser);
// userRoute.route("/:id").get(userController.getUser);
userRoute.route("/test1").get(userController.firstC);
userRoute.route("/test2").get(userController.firstC);
// userRoute.route("/upload").post(userController.uploadTestSaveLocal);
// userRoute.route("/uploadDB").post(userController.uploadTestSaveDB);
// userRoute.route("/img/:id").get(userController.getImage);

// userRoute.route("/register").post(userController.registerUser);
// userRoute.route("/:id").get(userController.getUser);

export default userRoute;
