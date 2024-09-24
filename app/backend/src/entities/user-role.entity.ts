import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";
import { AutoMap } from "@automapper/classes";

@Entity("user_role_tbl")
export class UserRole extends Base {
  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn()
  @AutoMap()
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn()
  @AutoMap()
  user: User;
}
