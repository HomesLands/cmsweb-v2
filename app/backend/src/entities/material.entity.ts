import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("material_tbl")
export class Material extends BaseEntity {
  @Column({ type: "varchar", name: "name_column" })
  name?: string;

  @Column({ type: "varchar", name: "rfid_column" })
  rfid?: string;

  @Column({ type: "int", name: "inventory_column" })
  inventory?: number;

  @Column({ type: "varchar", name: "status_column" })
  status?: string;

  @Column({ type: "varchar", name: "description_column" })
  description?: string;
}
