import { Entity, Column, OneToMany } from "typeorm";
import { Base, ProductRequisitionForm } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("company_tbl")
export class Company extends Base {
  @Column({ name: "name_column" })
  @AutoMap()
  name?: string;

  // a company have many product requisition form
  @OneToMany(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.company)
  productRequisitionForms?: ProductRequisitionForm[];
}
