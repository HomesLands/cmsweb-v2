import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base } from "./base.entity";
import { Unit } from "./unit.entity";
import { RequestProduct } from "./request-product.entity";
import { PurchaseProduct } from "./purchase-product.entity";

@Entity("temporary_product_tbl")
export class TemporaryProduct extends Base {
  @Column({ name: "name_column" })
  @AutoMap()
  name?: string;

  @Column({ name: "provider_column" })
  @AutoMap()
  provider?: string;

  @Column({ name: "description_column" })
  @AutoMap()
  description?: string;

  @ManyToOne(() => Unit, (unit) => unit.temporaryProducts)
  @JoinColumn({ name: "unit_column" })
  unit?: Unit;

  // a temporary product have many request product
  @OneToMany(() => RequestProduct,
    (requestProduct) => requestProduct.temporaryProduct)
  requestProducts?: RequestProduct[];

  // a temporary product have many purchase product
  @OneToMany(() => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.temporaryProduct)
  purchaseProducts?: PurchaseProduct[];
}
