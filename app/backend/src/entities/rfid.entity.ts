import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import {
  Base,
  ProductWarehouse,
} from "@entities";

@Entity("rfid_tbl")
export class RFID extends Base {
  @Column({ name: "code_column" })
  code?: string;

  @ManyToOne(() => ProductWarehouse,
    (productWarehouse) => productWarehouse.rfids)
  @JoinColumn({ name: "product_warehouse_column" })
  productWarehouse?: ProductWarehouse;
}