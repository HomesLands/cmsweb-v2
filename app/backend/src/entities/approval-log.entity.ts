import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base, UserApproval } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("approval_log_tbl")
export class ApprovalLog extends Base {
  @Column({ name: "status_column" })
  @AutoMap()
  status?: string; // ApprovalLogStatus in enums

  @Column({ name: "content_column" })
  @AutoMap()
  content?: string;

  @ManyToOne(() => UserApproval, (userApproval) => userApproval.approvalLogs)
  @JoinColumn({ name: "user_approval_column" })
  userApproval?: UserApproval;
}