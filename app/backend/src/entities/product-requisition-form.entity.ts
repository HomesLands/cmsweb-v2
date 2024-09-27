import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { 
  Base, 
  RequestProduct, 
  UserApproval, 
  User, 
  Project
} from "@entities"

@Entity("product_requisition_form_tbl")
export class ProductRequisitionForm extends Base {
  @Column({ name: "code_column", unique: true })
  @AutoMap()
  code?: string;

  @Column({ name: "status_column" })
  @AutoMap()
  status?: string; //ProductRequisitionFormStatus in enums

  @Column({ name: "is_recalled_column", default: false })
  @AutoMap()
  isRecalled?: boolean; // ProductRequisitionFormType in enums

  @Column({ name: "type_column" })
  @AutoMap()
  type?: string; // ProductRequisitionFormType in enums

  @Column({ name: "deadline_date_column" })
  @AutoMap()
  deadlineApproval?: Date;

  // save opinion of creator
  @Column({ name: "description_column", nullable: true })
  @AutoMap()
  description?: string; 

  // a ProductRequisition have many request product
  @OneToMany(
    () => RequestProduct,
    (requestProduct) => requestProduct.productRequisitionForm)
  requestProducts?: RequestProduct[];

  // a product requisition form have many user approval
  @OneToMany(
    () => UserApproval,
    (userApproval) => userApproval.productRequisitionForm
  )
  userApprovals?: UserApproval[];

  @ManyToOne(() => User, (user) => user.productRequisitionForms)
  @JoinColumn({ name: "creator_column"})
  creator?: User;

  @ManyToOne(() => Project, (project) => project.productRequisitionForms)
  @JoinColumn({ name: "project_column" })
  project?: Project;
}
