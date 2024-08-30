import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { User } from "@entities/user.entity";

@Entity("product_export_form")
export class ProductExportForm extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: "recipient_column" })
  recipient?: User;

  @Column({ name: "to_column" })
  to?: string;

  @Column({ name: "description_column" })
  description?: string;
}