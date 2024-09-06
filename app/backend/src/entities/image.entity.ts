import { Entity, Column } from "typeorm";
import { Base } from "@entities/base.entity";

@Entity("image_tbl")
export class Image extends Base {
  @Column({ type: "mediumblob", name: "data_column" })
  data?: Blob;

  @Column({ name: "file_name_column" })
  fileName?: string;
}
