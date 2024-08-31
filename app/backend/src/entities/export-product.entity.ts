import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("export_product_tbl")
export class ExportProduct extends BaseEntity {
  @Column({ name: "available_quantity_column" })
  availableQuantity?: number;

  @Column({ name: "product_id_column" })
  productId?: string;
}