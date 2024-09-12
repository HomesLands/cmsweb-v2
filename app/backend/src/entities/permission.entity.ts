import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { Role } from "./role.entity";
import { Authority } from "./authority.entity";

@Entity("permission_tbl")
export class Permission extends Base {
  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn()
  role: Role;

  @ManyToOne(() => Authority, (authority) => authority.permissions)
  @JoinColumn()
  authority: Authority;
}
