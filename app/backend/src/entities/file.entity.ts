import { Entity, Column } from "typeorm";
import { Base } from "@entities/base.entity";

@Entity("file_tbl")
export class File extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "type_column" })
  type?: string;

  @Column({ name: "content_column" })
  content?: string;

  @Column({ name: "length_column" })
  length?: number;
}
