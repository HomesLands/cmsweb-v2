import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity("user_department_tbl")
export class UserDepartment extends Base {
  @ManyToOne(() => Department,
    (department) => department.userDepartments)
  @JoinColumn({ name: "department_column" })
  department?: Department;

  @ManyToOne(() => User, (user) => user.userDepartments)
  @JoinColumn({ name: "user_column" })
  user?: User;
}