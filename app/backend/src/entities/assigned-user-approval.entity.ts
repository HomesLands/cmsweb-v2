import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base, Site, User, UserApproval } from "@entities";

@Entity("assigned_user_approval")
export class AssignedUserApproval extends Base {
  @Column({ name: "form_type_column" })
  @AutoMap()
  formType?: string; // FormApprovalType in enums

  @ManyToOne(() => Site, (site) => site.assignedUserApprovals)
  @JoinColumn({ name: "site_column" })
  site?: Site;

  // formType + roleApproval + site is unique
  @Column({ name: "role_approval_column" })
  @AutoMap()
  // @Unique(["formType", "roleApproval", "site", "user"])
  roleApproval?: string; //RoleApproval in enums

  @ManyToOne(() => User, (user) => user.assignedUserApprovals)
  @JoinColumn({ name: "user_column" })
  user?: User;

  @OneToMany(
    () => UserApproval,
    (userApproval) => userApproval.assignedUserApproval
  )
  userApprovals?: UserApproval[];
}
