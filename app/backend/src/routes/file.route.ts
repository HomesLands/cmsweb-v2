import { Router } from "express";
import { fileController } from "@controllers";

export const fileRoute: Router = Router();

fileRoute.route("/").post(fileController.uploadFileTest);