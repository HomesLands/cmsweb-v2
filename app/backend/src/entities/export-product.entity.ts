import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

@Entity("export_product_tbl")
export class ExportProduct extends Base {
  @Column({ name: "available_quantity_column" })
  availableQuantity?: number;

  @Column({ name: "product_id_column" })
  productId?: string;
}
