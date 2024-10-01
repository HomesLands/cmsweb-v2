import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { 
  Base,
  User,
  UserApproval,
} from "@entities";

// with a formType value, 
// the value of roleApproval must be different
// => couple formType + roleApproval is unique
// apply with row have isDeleted: false
// because default when create isDeleted = false
@Index(["formType", "roleApproval"], {
  unique: true,
  // where: '"isDeleted" = true'
})
@Entity("assigned_user_approval")
export class AssignedUserApproval extends Base {
  @Column({ name: "form_type_column" })
  @AutoMap()
  formType?: string; // FormApprovalType in enums

  @Column({ name: "role_approval_column" })
  @AutoMap()
  // @Unique(['formType', 'roleApproval']) 
  roleApproval?: string; //RoleApproval in enums

  @ManyToOne(() => User, (user) => user.assignedUserApprovals)
  @JoinColumn({ name: "user_column" })
  user?: User;

  @OneToMany(() => UserApproval, 
    (userApproval) => userApproval.assignedUserApproval)
  userApprovals?: UserApproval[];
}