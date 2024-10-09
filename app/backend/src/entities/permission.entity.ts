import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Base } from "@entities/base.entity";
import { Role } from "./role.entity";
import { Authority } from "./authority.entity";
import { AutoMap } from "@automapper/classes";
import { Resource } from "./resource.entity";

@Entity("permission_tbl")
export class Permission extends Base {
  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: "role_column" })
  @AutoMap()
  role: Role;

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
}
