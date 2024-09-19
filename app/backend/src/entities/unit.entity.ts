import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { Product } from "./product.entity";
import { AutoMap } from "@automapper/classes";

@Entity("unit_tbl")
export class Unit extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  // a unit have many product
  @OneToMany(() => Product, (product) => product.unit)
  products?: Product[];
}
