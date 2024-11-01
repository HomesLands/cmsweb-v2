import { Entity, Column, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base } from "./base.entity";
import { ProductWarehouse } from "./product-warehouse.entity";

@Entity("warehouse_tbl")
export class Warehouse extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  @Column({ name: "address_column" })
  @AutoMap()
  address?: string;

  @Column({ name: "description" , nullable: true})
  @AutoMap()
  description?: string;

  // a warehouse have many product warehouse
  @OneToMany(() => ProductWarehouse,
    (productWarehouse) => productWarehouse.warehouse)
  productWarehouses?: ProductWarehouse[];
}
