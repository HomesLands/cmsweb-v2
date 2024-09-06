import { Entity, Column } from "typeorm";
import { Base } from "@entities/base.entity";

@Entity("warehouse_tbl")
export class Warehouse extends Base {
  @Column({ name: "site_column" })
  site?: string;

  @Column({ name: "address_column" })
  address?: string;

  @Column({ name: "status_column" })
  status?: string;
}
