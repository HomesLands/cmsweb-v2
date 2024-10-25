import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Site } from "./site.entity";
import { AutoMap } from "@automapper/classes";

@Entity("company_tbl")
export class Company extends Base {
  @Column({ name: "name_column", unique: true, nullable: false })
  @AutoMap()
  name?: string;

  @Column({ name: "logo_column", nullable: true })
  @AutoMap()
  logo?: string;

  // a company have many site
  @OneToMany(() => Site, (site) => site.company)
  sites?: Site[];
}
