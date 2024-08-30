import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("request_product_tbl")
export class RequestProduct extends BaseEntity {
  @Column({ name: "request_quantity_column"})
  requestQuantity?: number;

  @Column({ name: "description_column"})
  description?: string;

  @Column({ name: "serial_column"})
  serial?: string;

  @Column({ name: "name_column"})
  name?: string;

  @Column({ name: "product_id_column"})
  productId?: string;

  @Column({ name: "provider" })
  provider?: string;
}