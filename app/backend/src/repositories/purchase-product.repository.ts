import { PurchaseProduct } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class PurchaseProductRepository extends BaseRepository<PurchaseProduct> {
  constructor() {
    super(PurchaseProduct, dataSource);
  }
}

export default new PurchaseProductRepository();