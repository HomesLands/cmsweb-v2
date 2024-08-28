import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
} from "typeorm";
import { AutoMap } from "@automapper/classes";

@Entity()
export class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id_column" })
  @AutoMap()
  id?: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at_column" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at_column" })
  updatedAt?: Date;
}
