import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

@Entity("file_tbl")
export class File extends Base {
  @Column({ name: "name_column", unique: true })
  name?: string;

  @Column({ name: "extension_column" })
  extension?: string;

  @Column({ name: "mimetype_column" })
  mimetype?: string;

  @Column({ type: "longtext", name: "data_column" })
  data?: string;

  @Column({ name: "size_column", nullable: true })
  size?: number;
}
