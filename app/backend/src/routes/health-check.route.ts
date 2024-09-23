import { healthCheckController } from "@controllers";
import { Router } from "express";

export const healthCheckRoute: Router = Router();

// [GET] /api/v1/healthCheck
healthCheckRoute.get("/status", healthCheckController.status);
