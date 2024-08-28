import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("image_tbl")
export class Image extends BaseEntity {
  @Column({ type: "mediumblob", name: "data_column" })
  data?: Blob;

  @Column({ type: "varchar", name: "file_name_column" })
  fileName?: string;
}
