import { Router } from "express";
import { productWarehouseController } from "@controllers";

export const productWarehouseRoute: Router = Router();

// [GET] /api/v1/productWarehouses
productWarehouseRoute.route("/")
  .get(productWarehouseController.getAllProductWarehouses)

// [POS] /api/v1/productWarehouses
productWarehouseRoute.route("/")
  .post(productWarehouseController.createProductWarehouse);
