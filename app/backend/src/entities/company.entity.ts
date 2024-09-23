import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Base, ProductRequisitionForm, User } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("company_tbl")
export class Company extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: "director_column" })
  @AutoMap()
  director?: User;

  // a company have many product requisition form
  @OneToMany(
    () => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.company
  )
  productRequisitionForms?: ProductRequisitionForm[];
}
