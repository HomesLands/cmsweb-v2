import { Entity, Column, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { AutoMap } from "@automapper/classes";

import { File } from "@entities/file.entity";
import { Position } from "@entities/position.entity";
import { Site } from "@entities/site.entity";

enum Gender {
  male = "male",
  female = "female",
}

@Entity("user_tbl")
export class User extends Base {
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

  @Column({ name: "dob_column" })
  dob?: string;

  @Column({ name: "gender_column" })
  gender?: Gender;

  @Column({ name: "address_column" })
  address?: string;

  @Column({ name: "phone_number_column" })
  phoneNumber?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: "avatar_column" })
  avatar?: File;

  @Column({ name: "status_column" })
  status?: string;

  @Column({ name: "is_approver_column" })
  isApprover?: string;

  @Column({ name: "approval_level_column" })
  approvalLevel?: number;

  @OneToOne(() => Position)
  @JoinColumn({ name: "position_column" })
  position?: Position;

  @OneToMany(() => Site, (site) => site.users)
  sites?: Site[];
}
