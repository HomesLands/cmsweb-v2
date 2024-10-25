import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base } from "./base.entity";
import { Site } from "./site.entity";
import { User } from "./user.entity";
import { UserApproval } from "./user-approval.entity";

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
  @Unique(['formType', 'roleApproval', 'site']) 
  roleApproval?: string; //RoleApproval in enums

  @ManyToOne(() => User, (user) => user.assignedUserApprovals)
  @JoinColumn({ name: "user_column" })
  user?: User;

  @OneToMany(() => UserApproval, 
    (userApproval) => userApproval.assignedUserApproval)
  userApprovals?: UserApproval[];
}