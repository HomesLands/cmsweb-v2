import { Entity, Column, JoinColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { File, Site, Base, Project, UserRole, UserApproval  } from "@entities";
import { Position } from "@entities/position.entity";
import {  } from "@entities/site.entity";

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

  @AutoMap()
  @Column({ name: "dob_column", nullable: true })
  dob?: string;

  @AutoMap()
  @Column({ name: "gender_column", nullable: true })
  gender?: string; // Gender in enums

  @AutoMap()
  @Column({ name: "address_column", nullable: true })
  address?: string;

  @AutoMap()
  @Column({ name: "phone_number_column", nullable: true })
  phoneNumber?: string;

  @AutoMap()
  @OneToOne(() => File)
  @JoinColumn({ name: "avatar_column" })
  avatar?: File;

  @AutoMap()
  @Column({ name: "status_column", nullable: true })
  status?: string;

  @AutoMap()
  @Column({ name: "is_approver_column", nullable: true })
  isApprover?: string;

  @AutoMap()
  @Column({ name: "approval_level_column", nullable: true })
  approvalLevel?: number;

  // @ManyToOne(() => Position, (position) => position.users)
  // @JoinColumn({ name: "position_id_column" })
  // position?: Position;

  // a user can manage many sides
  @OneToMany(() => Site, (site) => site.manager)
  sites?: Site[];

  // a user can manage many project
  @OneToMany(() => Project, (project) => project.manager)
  projects?: Project[];

  // A user can have many roles
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  // a user have many user approval
  @OneToMany(() => UserApproval, (userApproval) => userApproval.user)
  userApprovals?: UserApproval[];
}
