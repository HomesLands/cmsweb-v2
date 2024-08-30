import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { User } from "@entities/user.entity";

@Entity("site_tbl")
export class Site extends BaseEntity {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "address_column" })
  address?: string;

  @OneToMany(() => User, (user) => user.sites)
  users?: User[];
} 