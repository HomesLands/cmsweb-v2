import { ProductWarehouse } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProductWarehouseRepository extends BaseRepository<ProductWarehouse> {
  constructor() {
    super(ProductWarehouse, dataSource);
  }
}

export default new ProductWarehouseRepository();