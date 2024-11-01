import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./base.entity";
import { Role } from "./role.entity";
import { AutoMap } from "@automapper/classes";
import { Permission } from "./permission.entity";

@Entity("role_permission_tbl")
export class RolePermission extends Base {
  @ManyToOne(() => Role, (role) => role.rolePermissions)
  @JoinColumn({ name: "role_id_column" })
  @AutoMap()
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  @JoinColumn({ name: "permission_id_column" })
  @AutoMap()
  permission: Permission;
}
