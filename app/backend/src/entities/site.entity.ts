import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { User } from "@entities/user.entity";
import { Project } from "./project.entity";
import { AutoMap } from "@automapper/classes";

@Entity("site_tbl")
export class Site extends Base {
  @AutoMap()
  @Column({ name: "name_column" })
  name?: string;

  @AutoMap()
  @Column({ name: "address_column" })
  address?: string;

  @ManyToOne(() => User, (user) => user.sites)
  @JoinColumn({ name: "manager_id_column" })
  manager?: User;

  // @ManyToOne(() => Project, (project) => project.sites)
  // @JoinColumn({name: "project_id_column"})
  // project?: Project;
}
