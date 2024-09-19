import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Base, RequestProduct, Company, UserApproval } from "@entities"

@Entity("product_requisition_form_tbl")
export class ProductRequisitionForm extends Base {
  @Column({ name: "code_column"})
  @AutoMap()
  code?: string;

  @Column({ name: "status_column" })
  @AutoMap()
  status?: string; //ProductRequisitionFormStatus in enums

  @Column({ name: "type_column" })
  @AutoMap()
  type?: string; // ProductRequisitionFormType in enums

  @Column({ name: "recall_column", nullable: true })
  recall?: string;

  @Column({ name: "recall_level_column" , nullable: true })
  recallLevel?: number;

  @ManyToOne(() => Company, (company) => company.productRequisitionForms)
  @JoinColumn({ name: "company_column" })
  company?: Company;

  // a ProductRequisition have many request product
  @OneToMany(() => RequestProduct,
    (requestProduct) => requestProduct.productRequisitionForm,
    // { eager: true } // get all request product
  )
  requestProducts?: RequestProduct[];

  // a product requisition form have many user approval
  @OneToMany(() => UserApproval,
    (userApproval) => userApproval.productRequisitionForm)
  userApprovals?: UserApproval[];
}
