import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base, User, ProductRequisitionForm, ApprovalLog } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("user_approval_tbl")
export class UserApproval extends Base {
  @ManyToOne(() => User, (user) => user.userApprovals)
  @JoinColumn({ name: "user_column" })
  user?: User

  @Column({ name: "form_type_column" })
  formType?: string; // FormApprovalType in enums

  @Column({ name: "role_approval_column" })
  @AutoMap()
  roleApproval?: string; // RoleApproval in enums

  // with other form, do the same
  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.userApprovals,
    { nullable: true }
  )
  productRequisitionForm?: ProductRequisitionForm;

  // a user approval have many approval log
  @OneToMany(() => ApprovalLog, (approvalLog) => approvalLog.userApproval, {nullable: true})
  approvalLogs?: ApprovalLog[];
}
