import { Entity, Column } from "typeorm";
import { Base } from "@entities/base.entity";

@Entity("provider_tbl")
export class Provider extends Base {
  @Column({ name: "name_column" })
  name?: string;

  @Column({ name: "address_column" })
  address?: string;

  @Column({ name: "phone_number_column" })
  phoneNumber?: string;

  @Column({ name: "email_column" })
  email?: string;
}
