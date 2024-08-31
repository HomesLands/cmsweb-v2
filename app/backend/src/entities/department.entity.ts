import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("department_tbl")
export class Department extends BaseEntity {
  @Column({ name: "name_column"})
  name?: string;

  @Column({ name: "code_column"})
  code?: string;
}