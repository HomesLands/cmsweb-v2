import { Router } from "express";
import { databaseController } from "@controllers";

export const databaseRoute: Router = Router();

// [GET] /api/v1/database/backup
databaseRoute.get("/backup", databaseController.backup);
