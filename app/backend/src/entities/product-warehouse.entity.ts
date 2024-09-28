import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

import {
  Base,
  Product,
  RFID,
  Unit,
  Warehouse
} from "@entities";

@Entity("product_warehouse_tbl")
export class ProductWarehouse extends Base {
  @Column({ name: "quantity_column" })
  @AutoMap()
  quantity?: number;

  @ManyToOne(() => Unit, (unit) => unit.productWarehouses)
  @JoinColumn({ name: "unit_column" })
  unit?: Unit;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.productWarehouses)
  @JoinColumn({ name: "warehouse_column" })
  warehouse?: Warehouse;

  // a product ware house have many RFID
  @OneToMany(() => RFID, (rfid) => rfid.productWarehouse)
  rfids?: RFID[];

  @ManyToOne(() => Product, (product) => product.productWarehouses)
  @JoinColumn({ name: "product_column" })
  product?: Product;
}