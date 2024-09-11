import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { Permission } from "./permission.entity";

@Entity("authority_tbl")
export class Authority extends Base {
  @Column({ name: "name_normalize_column", nullable: false, unique: true })
  nameNormalize?: string;

  @Column({ name: "description_column" })
  description?: string;

  // An authority can have many permissions
  @OneToMany(() => Permission, (permission) => permission.authority)
  permissions: Permission[];
}
