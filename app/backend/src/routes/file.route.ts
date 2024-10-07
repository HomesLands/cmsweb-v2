import { Router } from "express";
import { fileController } from "@controllers";

export const fileRoute: Router = Router();

// [GET] /api/v1/files
fileRoute.route("/:name").get(fileController.getFileByName);
