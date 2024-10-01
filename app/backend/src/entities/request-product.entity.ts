import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductRequisitionForm } from "@entities/product-requisition-form.entity";
import { Product, Base, TemporaryProduct } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("request_product_tbl")
export class RequestProduct extends Base {
  @Column({ name: "request_quantity_column" })
  @AutoMap()
  requestQuantity?: number;

  @Column({ name: "description_column" , nullable: true })
  @AutoMap()
  description?: string;

  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.requestProducts)
    @JoinColumn({ name: "product_requisition_form_column" }) 
  productRequisitionForm?: ProductRequisitionForm;

  @ManyToOne(() => Product, 
    (product) => product.requestProducts, { nullable: true })
  @JoinColumn({ name: "product_column" })
  product?: Product;

  @Column({ name: "is_exist_product", default: true })
  @AutoMap()
  isExistProduct?: boolean;

  @ManyToOne(() => TemporaryProduct, 
    (temporaryProduct) => temporaryProduct.requestProducts, { nullable: true })
  @JoinColumn({ name: "temporary_product_column" })
  temporaryProduct?: TemporaryProduct;
}
