import { Router } from "express";
import { unitController } from "@controllers";

export const unitRoute: Router = Router();

// [GET] /api/v1/units
unitRoute.route("/")
  .get(unitController.getAllUnits)

// [POST] /api/v1/units
unitRoute.route("/")
  .post(unitController.createUnit);