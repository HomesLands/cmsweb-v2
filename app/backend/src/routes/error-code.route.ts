import { errorCodeController } from "@controllers";
import { Router } from "express";

export const errorCodeRoute: Router = Router();

// [GET] /api/v1/errorCodes
errorCodeRoute.get("", errorCodeController.getAllErrorCodes);
