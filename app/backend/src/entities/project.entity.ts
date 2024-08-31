import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("project_tbl")
export class Project extends BaseEntity {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ type: "timestamp", name: "start_date_column" })
  startDate?: Date;

  @Column({ name: "manager_column" })
  manager?: string;

  @Column({ name: "supervisor_column" })
  supervisor?: string;

  @Column({ name: "implementer_column" })
  implementer?: string;

  @Column({ name: "process_column" })
  process?: number;

  @Column({ name: "description_column" })
  description?: number;

  @Column({ name: "file_description_column" })
  fileDescription?: string;
}