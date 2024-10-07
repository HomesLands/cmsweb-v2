import { Column, Entity, OneToMany } from "typeorm";
import { Authority, Base } from "@entities";

@Entity("resource_tbl")
export class Resource extends Base {
  @Column({ name: "name_column", unique: true, nullable: false })
  name?: string;

  // An Resource can have many Authority
  @OneToMany(() => Authority, (authority) => authority.resource)
  authorities: Authority[];
}
