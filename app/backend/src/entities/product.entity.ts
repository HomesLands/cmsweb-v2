import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "@entities/base.entity";
import { Unit } from "@entities/unit.entity";

@Entity("product_tbl")
export class Product extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "rfid_column" })
  rfid?: string;

  @Column({ name: "inventory_column" })
  inventory?: number;

  @Column({ name: "status_column" })
  status?: string;

  @ManyToOne(() => Unit, (unit) => unit.products)
  @JoinColumn({ name: "unit_id_column" })
  unit?: Unit;

  @Column({ name: "description_column" })
  description?: string;
}
