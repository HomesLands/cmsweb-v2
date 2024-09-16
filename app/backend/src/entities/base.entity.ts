import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import bcrypt from "bcryptjs";
import { env } from "@constants";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid", { name: "id_column" })
  @AutoMap()
  id?: string;

  // @Column({name: "slug_column"})
  // @AutoMap()
  // slug?: string;

  // @BeforeInsert()
  // async generateSlug() {
  //   if (this.id) {
  //     const lastIdChar = this.id.substring(this.id.length - 12);
  //     this.slug = await bcrypt.hash(lastIdChar, env.hashSalt);
  //   }
  // }

  @CreateDateColumn({ type: "timestamp", name: "created_at_column" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at_column" })
  updatedAt?: Date;
}
