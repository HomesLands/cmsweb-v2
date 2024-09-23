import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base, User, ProductRequisitionForm } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("project_tbl")
export class Project extends Base {
  @AutoMap()
  @Column({ name: "name_column" })
  name?: string;

  @AutoMap()
  @Column({ type: "timestamp", name: "start_date_column" })
  startDate?: Date;

  // @Column({ name: "implementer_column" })
  // implementer?: string;

  @Column({ name: "process_column" })
  @AutoMap()
  process?: number;

  @AutoMap()
  @Column({ name: "description_column" })
  description?: string;

  @Column({ name: "file_description_column" })
  @AutoMap()
  fileDescription?: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({name: "manager_id_column"})
  manager?: User;

  // @OneToMany(() => Site, (site) => site.project)
  // sites: Site[]

  @OneToMany(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.project)
  productRequisitionForms?: ProductRequisitionForm[];
}
