import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base, UserApproval } from "@entities";

@Entity("approval_log_tbl")
export class ApprovalLog extends Base {
  @Column({ name: "status_column" })
  status?: string; // ApprovalLogStatus in enums

  @Column({ name: "content_column" })
  content?: string;

  @ManyToOne(() => UserApproval, (userApproval) => userApproval.approvalLogs)
  @JoinColumn({ name: "user_approval_column" })
  userApproval?: UserApproval;
}