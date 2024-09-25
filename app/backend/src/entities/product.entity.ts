import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base, Unit, RequestProduct } from "@entities";

@Entity("product_tbl")
export class Product extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  @Column({ name: "quantity_column", default: 0 })
  @AutoMap()
  quantity?: number;

  @Column({ name: "code_column", nullable: true })
  @AutoMap()
  code?: string;

  @Column({ name: "provider_column" })
  @AutoMap()
  provider?: string;

  @Column({ name: "rfid_column", nullable: true })
  @AutoMap()
  rfid?: string;

  @Column({ name: "description_column", nullable: true, type: "text" })
  @AutoMap()
  description?: string;

  @ManyToOne(() => Unit, (unit) => unit.products)
  @JoinColumn({ name: "unit_column" })
  unit?: Unit;

  // a product have many request product
  @OneToMany(() => RequestProduct, (requestProduct) => requestProduct.product)
  requestProducts?: RequestProduct[];
}
