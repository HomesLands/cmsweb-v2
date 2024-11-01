import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { AutoMap } from "@automapper/classes";
import { Product } from "./product.entity";
import { TemporaryProduct } from "./temporary-product.entity";
import { ProductPurchaseForm } from "./product-purchase-form.entity";

@Entity("purchase_product_tbl")
export class PurchaseProduct extends Base {
  @Column({ name: "purchase_quantity_column" })
  @AutoMap()
  purchaseQuantity?: number;

  @Column({ name: "description_column" , nullable: true })
  @AutoMap()
  description?: string;

  @Column({ name: "is_exist_product", default: true })
  @AutoMap()
  isExistProduct?: boolean;

  @ManyToOne(() => Product, 
    (product) => product.requestProducts, { nullable: true })
  @JoinColumn({ name: "product_column" })
  product?: Product;

  @ManyToOne(() => TemporaryProduct, 
    (temporaryProduct) => temporaryProduct.purchaseProducts, 
    { 
      nullable: true,
      cascade: ['insert', 'update']
    })
  @JoinColumn({ name: "temporary_product_column" })
  temporaryProduct?: TemporaryProduct;

  @ManyToOne(() => ProductPurchaseForm,
    (productPurchaseForm) => productPurchaseForm.purchaseProducts)
  @JoinColumn({ name: "product_purchase_form_column"})
  productPurchaseForm?: ProductPurchaseForm;
}