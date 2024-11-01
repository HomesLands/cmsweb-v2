import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { UserRole } from "./user-role.entity";
import { AutoMap } from "@automapper/classes";
import { RolePermission } from "./role-permission.entity";

@Entity("role_tbl")
export class Role extends Base {
  @Column({ name: "name_normalize_column", nullable: false, unique: true })
  @AutoMap()
  nameNormalize?: string;

  @Column({ name: "name_display_column" })
  @AutoMap()
  nameDisplay?: string;

  @Column({ name: "description_column", nullable: false })
  @AutoMap()
  description?: string;

  // A role can have many permissions
  @AutoMap()
  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];

  // A role can have many user roles
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
