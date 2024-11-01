import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base } from "./base.entity";
import { Company } from "./company.entity";
import { Department } from "./department.entity";
import { Project } from "./project.entity";
import { AssignedUserApproval } from "./assigned-user-approval.entity";

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

  // a site have many assignedUserApproval
  @OneToMany(() => AssignedUserApproval,
    (assignedUserApproval) => assignedUserApproval.site)
  assignedUserApprovals?: AssignedUserApproval[];
}
