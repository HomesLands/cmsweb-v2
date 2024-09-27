import { Entity, Column, ManyToOne } from "typeorm";
import { 
  Base,
  RequestProduct, 
} from "@entities";

@Entity("file_tbl")
export class File extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "type_column" })
  type?: string;

  @Column({ type: "mediumblob", name: "data_column" })
  data?: string;

  @Column({ name: "length_column", nullable: true })
  length?: number;

  @ManyToOne(() => RequestProduct, (requestProduct) => requestProduct.codeImages)
  requestProduct?: RequestProduct;
}
