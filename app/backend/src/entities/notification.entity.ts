import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "@entities/base.entity";
import { AutoMap } from "@automapper/classes";
import { User } from "./user.entity";

@Entity("notification_tbl")
export class Notification extends Base {
  @ManyToOne(() => User, (user) => user.notificarions)
  @JoinColumn({ name: "user_id_column" })
  @AutoMap()
  user?: User;

  @AutoMap()
  @Column({ name: "message_column" })
  message?: string;

  @AutoMap()
  @Column({ name: "type_column" })
  type?: string;

  @AutoMap()
  @Column({ name: "url_column", nullable: true })
  url?: string;

  @AutoMap()
  @Column({ name: "is_read_column", default: false })
  isRead?: boolean;
}
