import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { Role } from "./role.entity";
import { Authority } from "./authority.entity";
import { AutoMap } from "@automapper/classes";

@Entity("permission_tbl")
export class Permission extends Base {
  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: "role_id_column" })
  @AutoMap()
  role: Role;

  @ManyToOne(() => Authority, (authority) => authority.permissions)
  @JoinColumn({ name: "authority_id_column" })
  @AutoMap()
  authority: Authority;
}
