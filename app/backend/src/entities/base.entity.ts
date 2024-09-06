import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid", { name: "id_column" })
  @AutoMap()
  id?: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at_column" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at_column" })
  updatedAt?: Date;
}
