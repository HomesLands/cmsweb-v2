import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { AutoMap } from "@automapper/classes";

@Entity("user_tbl")
export class User extends BaseEntity {
  @AutoMap()
  @Column({ name: "first_name_column" })
  firstName?: string;

  @AutoMap()
  @Column({ name: "last_name_column" })
  lastName?: string;

  @AutoMap()
  @Column({ name: "username_column" })
  username?: string;

  @Column({ name: "password_column" })
  password?: string;
}
