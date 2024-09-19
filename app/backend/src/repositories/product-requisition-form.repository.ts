import { ProductRequisitionForm } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { GlobalError, ErrorCodes } from "@exception";
import { DeepPartial } from "typeorm";

class ProductRequisitionFormRepository extends BaseRepository<ProductRequisitionForm> {
  constructor() {
    super(ProductRequisitionForm, dataSource);
  }

  public async findProductRequisitionForm(id: string): Promise<ProductRequisitionForm | null> {
    return this.findOneBy({ id });
  }

  public async updateProductRequisitionForm(
    id: string,
    dataUpdate: Partial<ProductRequisitionForm>
  ): Promise<ProductRequisitionForm | null> {
    const entity = await this.findOneBy({ id });
    if(!entity) return null;    

    Object.assign(entity, dataUpdate);

    const updatedEntity = await this.save({id, dataUpdate});

    return updatedEntity;
  }
}

export default new ProductRequisitionFormRepository();