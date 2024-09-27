import { Entity, Column, OneToMany } from "typeorm";
import { Base, Site } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("company_tbl")
export class Company extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  // a company have many site
  @OneToMany(() => Site, (site) => site.company)
  sites?: Site[];
}
