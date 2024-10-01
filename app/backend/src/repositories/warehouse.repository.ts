import { Warehouse } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class WarehouseRepository extends BaseRepository<Warehouse> {
  constructor() {
    super(Warehouse, dataSource);
  }
}

export default new WarehouseRepository();