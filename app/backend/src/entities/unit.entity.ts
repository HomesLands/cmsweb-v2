import { Entity, Column, OneToMany } from "typeorm";
import { 
  Base,
  ProductWarehouse, 
} from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("unit_tbl")
export class Unit extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  // a unit have many product warehouse
  @OneToMany(() => ProductWarehouse,
    (productWarehouse) => productWarehouse.unit)
  productWarehouses?: ProductWarehouse[];
}
