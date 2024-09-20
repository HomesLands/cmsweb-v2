import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ProductRequisitionForm } from "@entities/product-requisition-form.entity";
import { Product, Image, Base } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("request_product_tbl")
export class RequestProduct extends Base {
  @Column({ name: "request_quantity_column" })
  @AutoMap()
  requestQuantity?: number;

  @Column({ name: "description_column" , nullable: true })
  description?: string;

  // a Request product have one or many image
  @OneToMany(() => Image, (image) => image.requestProduct, { eager: true, nullable: true })
  codeImages?: Image[];

  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.requestProducts)
    @JoinColumn({ name: "product_requisition_form_column" }) 
  productRequisitionForm?: ProductRequisitionForm;

  @ManyToOne(() => Product, (product) => product.requestProducts)
  @JoinColumn({ name: "product_id_column" })
  product?: Product;
}
