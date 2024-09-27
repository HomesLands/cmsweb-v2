import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ProductRequisitionForm } from "@entities/product-requisition-form.entity";
import { Product, File, Base } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("request_product_tbl")
export class RequestProduct extends Base {
  @Column({ name: "request_quantity_column" })
  @AutoMap()
  requestQuantity?: number;

  @Column({ name: "description_column" , nullable: true })
  @AutoMap()
  description?: string;

  // a Request product have one or many image code
  @OneToMany(() => File, (file) => file.requestProduct, { eager: true, nullable: true })
  codeImages?: File[];

  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.requestProducts)
    @JoinColumn({ name: "product_requisition_form_column" }) 
  productRequisitionForm?: ProductRequisitionForm;

  @ManyToOne(() => Product, (product) => product.requestProducts)
  @JoinColumn({ name: "product_id_column" })
  product?: Product;
}
