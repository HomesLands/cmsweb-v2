import { Entity, Column, OneToMany } from "typeorm";
import { 
  Base,
  Product,
  TemporaryProduct,
} from "@entities";
import { AutoMap } from "@automapper/classes";

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
