import { ProductRequisitionForm } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProductRequisitionFormRepository extends BaseRepository<ProductRequisitionForm> {
  constructor() {
    super(ProductRequisitionForm, dataSource);
  }

  public async findProductRequisitionForm(id: string): Promise<ProductRequisitionForm | null> {
    return this.findOneBy({ id });
  }
}

export default new ProductRequisitionFormRepository();