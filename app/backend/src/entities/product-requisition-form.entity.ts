import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base, RequestProduct, Company, UserApproval, User, Project, Site } from "@entities"

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

  @ManyToOne(() => Company, (company) => company.productRequisitionForms)
  @JoinColumn({ name: "company_column" })
  company?: Company;

  // save opinion of creator
  @Column({ name: "description_column", nullable: true })
  @AutoMap()
  description?: string; 

  // a ProductRequisition have many request product
  @OneToMany(
    () => RequestProduct,
    (requestProduct) => requestProduct.productRequisitionForm
    // { eager: true } // get all request product
  )
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
  
  @ManyToOne(() => Site, (site) => site.productRequisitionForms)
  @JoinColumn({ name: "site_column"})
  site?: Site;

  @ManyToOne(() => Project, (project) => project.productRequisitionForms)
  @JoinColumn({ name: "project_column"})
  project?: Project;
}
