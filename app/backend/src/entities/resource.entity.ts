import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Permission } from "./permission.entity";

@Entity("resource_tbl")
export class Resource extends Base {
  @Column({ name: "name_column", unique: true, nullable: false })
  name?: string;

  // An Resource can have many Authority
  @OneToMany(() => Permission, (permission) => permission.resource)
  permissions: Permission[];
}
