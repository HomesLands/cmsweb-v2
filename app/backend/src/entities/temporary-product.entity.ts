import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base, RequestProduct, Unit } from "@entities";

@Entity("temporary_product_tbl")
export class TemporaryProduct extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  @Column({ name: "provider_column" })
  @AutoMap()
  provider?: string;

  @ManyToOne(() => Unit, (unit) => unit.temporaryProducts)
  @JoinColumn({ name: "unit_column" })
  unit?: Unit;

  // a temporary product have many request product
  @OneToMany(() => RequestProduct,
    (requestProduct) => requestProduct.temporaryProduct)
  requestProducts?: RequestProduct[];
}
