import { AfterInsert, AfterUpdate, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

import {
  Base,
  Product,
  RFID,
  Warehouse
} from "@entities";

@Index(["product", "warehouse"], {
  unique: true,
})
@Entity("product_warehouse_tbl")
export class ProductWarehouse extends Base {
  @Column({ name: "quantity_column", default: 0 })
  @AutoMap()
  quantity?: number;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.productWarehouses)
  @JoinColumn({ name: "warehouse_column" })
  warehouse?: Warehouse;

  // a product ware house have many RFID
  @OneToMany(() => RFID, (rfid) => rfid.productWarehouse)
  rfids?: RFID[];

  @ManyToOne(() => Product, (product) => product.productWarehouses)
  @JoinColumn({ name: "product_column" })
  product?: Product;

  // @AfterInsert()
  // @AfterUpdate()
  // async updateProductQuantity() {
  //   if (this.product) {
  //     await this.product.updateTotalQuantity();
  //   }
  // }
}