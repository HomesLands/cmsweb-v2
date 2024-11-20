import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base } from "./base.entity";
import { Site } from "./site.entity";
import { UserDepartment } from "./user-department.entity";

@Entity("department_tbl")
export class Department extends Base {
  @Column({ name: "name_normalize_column" })
  @AutoMap()
  nameNormalize?: string;

  @Column({ name: "description_column" })
  @AutoMap()
  description?: string;

  @OneToMany(
    () => UserDepartment,
    (userDepartment) => userDepartment.department
  )
  userDepartments?: UserDepartment[];

  @ManyToOne(() => Site, (site) => site.departments)
  @JoinColumn({ name: "site_column" })
  site?: Site;
}
