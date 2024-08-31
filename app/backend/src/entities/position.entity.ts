import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "entities/base.entity";
import { Department } from "@entities/department.entity";

@Entity("position_tbl")
export class Position extends BaseEntity {
  @Column({ name: "name_column"})
  name?: string;

  @Column({ name: "code_column"})
  code?: string;

  @OneToOne(() => Department )
  @JoinColumn({ name: "department_column"})
  department?: Department;
}