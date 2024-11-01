import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Permission } from "./permission.entity";
import { AutoMap } from "@automapper/classes";

@Entity("authority_tbl")
export class Authority extends Base {
  @Column({ name: "name_normalize_column", nullable: false, unique: true })
  @AutoMap()
  nameNormalize?: string;

  @Column({ name: "name_display_column" })
  @AutoMap()
  nameDisplay?: string;

  @Column({ name: "description_column" })
  @AutoMap()
  description?: string;

  // An authority can have many permissions
  @OneToMany(() => Permission, (permission) => permission.authority)
  permissions: Permission[];
}
