import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { Product } from "./product.entity";

@Entity("unit_tbl")
export class Unit extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @OneToMany(() => Product, (product) => product.unit)
  products?: Product[];
}
