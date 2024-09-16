import { Entity, Column, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { ProductRequisitionForm } from "@entities/product-requisition-form.entity";

@Entity("request_product_tbl")
export class RequestProduct extends Base {
  @Column({ name: "request_quantity_column" })
  requestQuantity?: number;

  @Column({ name: "description_column" })
  description?: string;

  @Column({ name: "serial_column" })
  serial?: string;

  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "product_id_column" })
  productId?: string;

  @Column({ name: "provider_column" })
  provider?: string;

  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.requestProducts)
    @JoinColumn({ name: "product_requisition_form_column" }) 
  productRequisitionForm?: ProductRequisitionForm;
}
