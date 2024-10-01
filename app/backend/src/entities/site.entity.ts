import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Base, Company, Department, Project } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("site_tbl")
export class Site extends Base {
  @AutoMap()
  @Column({ name: "name_column", unique: true })
  name?: string;

  @ManyToOne(() => Company, (company) => company.sites)
  @JoinColumn({ name: "company_column" })
  company?: Company;

  // a site have many department
  @OneToMany(() => Department, (department) => department.site)
  departments?: Department[];
  
  // a site have many project
  @OneToMany(() => Project, (project) => project.site)
  projects?: Project[];
}
