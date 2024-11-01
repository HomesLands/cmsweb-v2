import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base } from "./base.entity";
import { ProductRequisitionForm } from "./product-requisition-form.entity";
import { Site } from "./site.entity";

@Entity("project_tbl")
export class Project extends Base {
  @AutoMap()
  @Column({ name: "name_column" })
  name?: string;

  @AutoMap()
  @Column({ type: "timestamp", name: "start_date_column" })
  startDate?: Date;

  @AutoMap()
  @Column({ name: "description_column" })
  description?: string;

  @Column({ name: "file_description_column", nullable: true })
  @AutoMap()
  fileDescription?: string;

  // a project have many product requisition form
  @OneToMany(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.project)
  productRequisitionForms?: ProductRequisitionForm[];

  @ManyToOne(() => Site, (site) => site.projects)
  @JoinColumn({ name: "site_column" })
  site?: Site;
}
