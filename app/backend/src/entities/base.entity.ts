import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import shortid from "shortid";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid", { name: "id_column" })
  @AutoMap()
  id?: string;

  @Column({ name: "slug_column", unique: true })
  @AutoMap()
  slug?: string = shortid.generate();

  @CreateDateColumn({ type: "timestamp", name: "created_at_column" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at_column" })
  updatedAt?: Date;
}
