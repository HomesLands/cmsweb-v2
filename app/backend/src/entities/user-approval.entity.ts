import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { 
  Base, 
  ProductRequisitionForm, 
  ApprovalLog,
  AssignedUserApproval, 
} from "@entities";

@Entity("user_approval_tbl")
export class UserApproval extends Base {
  @ManyToOne(() => AssignedUserApproval,
    (assignedUserApproval) => assignedUserApproval.userApprovals)
  @JoinColumn({ name: "assigned_user_approval_column" })
  assignedUserApproval?: AssignedUserApproval;

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
