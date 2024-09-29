import { Router } from "express";
import { warehouseController } from "@controllers";

export const warehouseRoute: Router = Router();

// [GET] /api/v1/warehouses
warehouseRoute.route("/")
  .get(warehouseController.getAllWarehouses)

// [POS] /api/v1/warehouses
warehouseRoute.route("/")
  .post(warehouseController.createWarehouse);


