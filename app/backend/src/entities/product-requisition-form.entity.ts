import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base } from "./base.entity";
import { RequestProduct } from "./request-product.entity";
import { UserApproval } from "./user-approval.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { ProductPurchaseForm } from "./product-purchase-form.entity";

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

  @Column({ name: "project_name_column", nullable: true })
  @AutoMap()
  projectName?: string;

  // a ProductRequisition have many request product
  @OneToMany(
    () => RequestProduct,
    (requestProduct) => requestProduct.productRequisitionForm,
    {
      cascade: ["insert", "update"],
    }
  )
  requestProducts?: RequestProduct[];

  // a product requisition form have many user approval
  @OneToMany(
    () => UserApproval,
    (userApproval) => userApproval.productRequisitionForm,
    {
      cascade: ["insert", "update"],
    }
  )
  userApprovals?: UserApproval[];

  @ManyToOne(() => User, (user) => user.productRequisitionForms)
  @JoinColumn({ name: "creator_column" })
  creator?: User;

  @ManyToOne(
    () => Project, 
    (project) => project.productRequisitionForms,
    { nullable: true }
  )
  @JoinColumn({ name: "project_column" })
  project?: Project;

  // a product requisition form can have many product purchase forms
  @OneToMany(() => ProductPurchaseForm,
    (productPurchaseForm) => productPurchaseForm.productRequisitionForm)
  productPurchaseForms?: ProductPurchaseForm[];
}
