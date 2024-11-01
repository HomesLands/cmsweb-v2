import { Entity, Column, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base } from "./base.entity";

import {
  UserRole,
  ProductRequisitionForm,
  AssignedUserApproval,
  UserDepartment,
} from "@entities";
import { Notification } from "./notification.entity";

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
  @Column({ name: "email_column", nullable: true })
  email?: string;

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
  @Column({ name: "avatar_column", nullable: true })
  avatar?: string;

  @AutoMap()
  @Column({ name: "signature_column", nullable: true })
  signature?: string;

  // A user can have many roles
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  @OneToMany(() => Notification, (notificarion) => notificarion.user)
  notificarions?: Notification[];

  // creator
  // a user can create many product requisition form
  @OneToMany(
    () => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.creator
  )
  productRequisitionForms?: ProductRequisitionForm[];

  // a user have many assignedUserApproval
  @OneToMany(
    () => AssignedUserApproval,
    (assignedUserApproval) => assignedUserApproval.user
  )
  assignedUserApprovals?: AssignedUserApproval[];

  // a user have many userDepartment
  @OneToMany(() => UserDepartment, (userDepartment) => userDepartment.user)
  userDepartments?: UserDepartment[];
}
