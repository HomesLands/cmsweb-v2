import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { AutoMap } from "@automapper/classes";
import { ProductRequisitionForm } from "./product-requisition-form.entity";
import { PurchaseProduct } from "./purchase-product.entity";

// a purchase form can split many import form
@Entity("product_purchase_form_tbl")
export class ProductPurchaseForm extends Base {
  @Column({ name: "code_column", unique: true })
  @AutoMap()
  code?: string;

  @Column({ name: "status_column" })
  @AutoMap()
  status?: string; //ProductPurchaseFormStatus in enums 
  // waiting, purchasing, importing, done

  @Column({ name: "description_column", nullable: true })
  @AutoMap()
  description?: string;

  // a product  purchase form can have many purchase product
  @OneToMany(() => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.productPurchaseForm,
    {
      cascade: ['insert', 'update']
    })
  purchaseProducts?: PurchaseProduct[];

  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.productPurchaseForms,
  { nullable: true })
  @JoinColumn({ name: "product_purchase_form_column"})
  productRequisitionForm?: ProductRequisitionForm;  
}
