import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { File } from "@entities/file.entity";

enum FormApprovalType {
  ProductRequisitionForm = "ProductRequisitionForm",
  ProductExportForm = "ProductExportForm",
  PurchaseRequisitionForm  = "PurchaseRequisitionForm",
}
@Entity("user_approval_tbl")
export class UserApproval extends BaseEntity {
  @Column({ name: "user_id_column"})
  userId?: string;

  @Column({ name: "status_column"})
  status?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: "signature_column"})
  signature?: File;

  @Column({ name: "form_type_column"})
  formType?: FormApprovalType;

  @Column({ name: "description_column"})
  description?: string;
}