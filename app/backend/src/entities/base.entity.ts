import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import shortid from "shortid";

export class Base {
  @PrimaryGeneratedColumn("uuid", { name: "id_column" })
  id?: string;

  @Column({ name: "slug_column", unique: true })
  @AutoMap()
  slug?: string;

  @AutoMap()
  @CreateDateColumn({ type: "timestamp", name: "created_at_column" })
  createdAt?: Date;

  @AutoMap()
  @UpdateDateColumn({ type: "timestamp", name: "updated_at_column" })
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at_column" }) // This will handle soft deletes
  deletedAt?: Date; // This column will automatically manage soft delete timestamps

  @Column({ name: "created_by_column", nullable: true })
  createdBy?: string;

  @BeforeInsert()
  initSlug?() {
    this.slug = shortid.generate();
  }
}
