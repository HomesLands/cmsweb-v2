import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { RequestProduct } from "@entities/request-product.entity";

@Entity("product_requisition_form_tbl")
export class ProductRequisitionForm extends Base {
  @Column({ name: "code_column"})
  code?: string;

  @Column({ name: "company_name_column" })
  companyName?: string;

  @Column({ name: "status_column" })
  status?: string;

  @Column({ name: "recall_column" })
  recall?: string;

  @Column({ name: "recall_level_column" })
  recallLevel?: number;

  // a ProductRequisition have many request product
  @OneToMany(() => RequestProduct,
    (requestProduct) => requestProduct.productRequisitionForm,
    { eager: true } // have all request product
  )
  requestProducts?: RequestProduct[];
}
