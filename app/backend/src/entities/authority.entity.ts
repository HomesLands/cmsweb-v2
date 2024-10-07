import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { Permission } from "./permission.entity";
import { AutoMap } from "@automapper/classes";
import { Resource } from "./resource.entity";

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

  @ManyToOne(() => Resource, (resource) => resource.authorities)
  @JoinColumn({ name: "resource_id_column" })
  @AutoMap()
  resource: Resource;
}
