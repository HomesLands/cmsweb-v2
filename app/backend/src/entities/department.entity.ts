import { Entity, Column } from "typeorm";
import { Base } from "@entities/base.entity";

@Entity("department_tbl")
export class Department extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "code_column" })
  code?: string;
}
