import { Entity, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Authority } from "./authority.entity";
import { AutoMap } from "@automapper/classes";
import { Resource } from "./resource.entity";
import { RolePermission } from "./role-permission.entity";

@Entity("permission_tbl")
export class Permission extends Base {
  @ManyToOne(() => Authority, (authority) => authority.permissions)
  @JoinColumn({ name: "authority_column" })
  @AutoMap()
  authority: Authority;

  @ManyToOne(() => Resource, (resource) => resource.permissions)
  @JoinColumn({ name: "resource_id_column" })
  @AutoMap()
  resource: Resource;

  @Column({ name: "required_owner_column" })
  @AutoMap()
  requiredOwner?: boolean = false;

  // A role can have many permissions
  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission
  )
  rolePermissions: RolePermission[];
}
