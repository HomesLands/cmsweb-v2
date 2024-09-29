import { ProductRequisitionForm } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProductRequisitionFormRepository extends BaseRepository<ProductRequisitionForm> {
  constructor() {
    super(ProductRequisitionForm, dataSource);
  }
}

export default new ProductRequisitionFormRepository();