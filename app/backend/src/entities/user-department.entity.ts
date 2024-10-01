import { Entity, JoinColumn, ManyToOne } from "typeorm";
import {
  Base,
  Department,
  User
} from "@entities";
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