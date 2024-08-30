import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("unit_tbl")
export class Unit extends BaseEntity {
  @Column({ name: "name_column"})
  name?: string;
}