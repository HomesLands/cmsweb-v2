import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { Unit } from "@entities/unit.entity";

@Entity("product_tbl")
export class Product extends BaseEntity {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "rfid_column" })
  rfid?: string;

  @Column({ name: "inventory_column" })
  inventory?: number;

  @Column({ name: "status_column" })
  status?: string;

  @OneToOne(() => Unit)
  @JoinColumn({ name: "unit_column"})
  unit?: Unit;

  @Column({ name: "description_column" })
  description?: string;
}
