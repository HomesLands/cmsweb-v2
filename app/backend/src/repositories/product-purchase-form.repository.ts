import { ProductPurchaseForm } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProductPurchaseFormRepository extends BaseRepository<ProductPurchaseForm> {
  constructor() {
    super(ProductPurchaseForm, dataSource);
  }
}

export default new ProductPurchaseFormRepository();