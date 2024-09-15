import { Entity, Column, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { Base } from "@entities/base.entity";
import { AutoMap } from "@automapper/classes";

import { File } from "@entities/file.entity";
import { Position } from "@entities/position.entity";
import { Site } from "@entities/site.entity";
import { Project } from "@entities/project.entity";

import { Gender } from "enums";

@Entity("user_tbl")
export class User extends Base {
  @AutoMap()
  @Column({ name: "full_name_column" })
  fullname?: string;

  @AutoMap()
  @Column({ name: "username_column" })
  username?: string;

  @Column({ name: "password_column" })
  password?: string;

  @Column({ name: "dob_column", nullable: true })
  dob?: string;

  @Column({ name: "gender_column", nullable: true })
  gender?: Gender;

  @Column({ name: "address_column", nullable: true })
  address?: string;

  @Column({ name: "phone_number_column", nullable: true })
  phoneNumber?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: "avatar_column" })
  avatar?: File;

  @Column({ name: "status_column", nullable: true })
  status?: string;

  @Column({ name: "is_approver_column", nullable: true })
  isApprover?: string;

  @Column({ name: "approval_level_column", nullable: true })
  approvalLevel?: number;

  @ManyToOne(() => Position, (position) => position.users)
  @JoinColumn({ name: "position_id_column" })
  position?: Position;

  // a user can manage many sides
  @OneToMany(() => Site, (site) => site.manager)
  sites?: Site[];

  // a user can manage many project
  @OneToMany(() => Project, (project) => project.manager)
  projects?: Project[];
}
