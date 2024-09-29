import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base, Site, UserDepartment } from "@entities"; 

@Entity("department_tbl")
export class Department extends Base {
  @Column({ name: "name_normalize_column", unique: true })
  @AutoMap()
  nameNormalize?: string;

  @Column({ name: "description_column" })
  @AutoMap()
  description?: string;

  @OneToMany(() => UserDepartment, 
    (userDepartment) => userDepartment.department)
  userDepartments?: UserDepartment[];

  @ManyToOne(() => Site, (site) => site.departments)
  @JoinColumn({ name: "site_column" })
  site?: Site;
}
