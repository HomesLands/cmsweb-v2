import { Router } from "express";
import { fileController } from "@controllers";

export const fileRoute: Router = Router();

// [POS] /api/v1/files
fileRoute.route("/").post(fileController.uploadFileDB);

// [GET] /api/v1/files
fileRoute.route("/:name").get(fileController.getImgByName);
