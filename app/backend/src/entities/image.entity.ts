import { Entity, Column, ManyToMany, ManyToOne } from "typeorm";
import { Base, RequestProduct } from "@entities";

@Entity("image_tbl")
export class Image extends Base {
  @Column({ type: "mediumblob", name: "data_column" })
  data?: Blob;

  @Column({ name: "file_name_column" })
  fileName?: string;

  @ManyToOne(() => RequestProduct, (requestProduct) => requestProduct.codeImages)
  requestProduct?: RequestProduct;
}
