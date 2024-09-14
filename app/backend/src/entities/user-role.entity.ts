import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity("user_role_tbl")
export class UserRole extends Base {
  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn()
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn()
  user: User;
}
