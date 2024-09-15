import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { Base } from "entities/base.entity";
import { Department } from "@entities/department.entity";
import { User } from "./user.entity";

@Entity("position_tbl")
export class Position extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "code_column" })
  code?: string;

  @OneToOne(() => Department)
  @JoinColumn({ name: "department_column" })
  department?: Department;

  @OneToMany(() => User, (user) => user.position)
  users: User[];
}
