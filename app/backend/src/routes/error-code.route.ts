import { errorCodeController } from "@controllers";
import { Router } from "express";

export const errorCodeRoute: Router = Router();

errorCodeRoute.get("", errorCodeController.getAllErrorCodes);
