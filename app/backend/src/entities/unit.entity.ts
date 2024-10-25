import { Entity, Column, OneToMany } from "typeorm";

import { AutoMap } from "@automapper/classes";
import { Base } from "./base.entity";
import { Product } from "./product.entity";
import { TemporaryProduct } from "./temporary-product.entity";

@Entity("unit_tbl")
export class Unit extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  // a unit have many product
  @OneToMany(() => Product,
    (product) => product.unit)
  products?: Product[];

  // a unit have many temporary  product
  @OneToMany(() => TemporaryProduct,
    (temporaryProduct) => temporaryProduct.unit)
  temporaryProducts?: TemporaryProduct[];
}
