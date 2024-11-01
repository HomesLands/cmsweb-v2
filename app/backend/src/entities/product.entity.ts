import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base } from "./base.entity";
import { Unit } from "./unit.entity";
import { RequestProduct } from "./request-product.entity";
import { PurchaseProduct } from "./purchase-product.entity";
import { ProductWarehouse } from "./product-warehouse.entity";

@Entity("product_tbl")
export class Product extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  @Column({ name: "quantity_column", default: 0 })
  @AutoMap()
  quantity?: number;

  @Column({ name: "code_column", nullable: true, unique: true })
  @AutoMap()
  code?: string;

  @Column({ name: "provider_column" })
  @AutoMap()
  provider?: string;

  @Column({ name: "description_column", nullable: true, type: "text" })
  @AutoMap()
  description?: string;

  @ManyToOne(() => Unit, (unit) => unit.products)
  @JoinColumn({ name: "unit_column" })
  unit?: Unit;

  // a product have many request product
  @OneToMany(() => RequestProduct, 
    (requestProduct) => requestProduct.product)
  requestProducts?: RequestProduct[];

  // a product have many purchase product
  @OneToMany(() => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.product)
  purchaseProducts?: PurchaseProduct[];

  // a product have many productWarehouse
  @OneToMany(
    () => ProductWarehouse,
    (productWarehouse) => productWarehouse.product
  )
  productWarehouses?: ProductWarehouse[];
}
