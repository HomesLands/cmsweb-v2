import { Router } from "express";
import { unitController } from "@controllers";

export const unitRoute: Router = Router();
unitRoute.route("/")
  .get(unitController.getAllUnits)
  .post(unitController.createUnit);