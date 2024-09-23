import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base, User, ProductRequisitionForm } from "@entities";
import { AutoMap } from "@automapper/classes";

@Entity("site_tbl")
export class Site extends Base {
  @AutoMap()
  @Column({ name: "name_column", unique: true })
  name?: string;

  @AutoMap()
  @Column({ name: "address_column" })
  address?: string;

  @ManyToOne(() => User, (user) => user.sites)
  @JoinColumn({ name: "manager_id_column" })
  manager?: User;

  @ManyToOne(() => ProductRequisitionForm,
    (productRequisitionForm) => productRequisitionForm.site)
  productRequisitionForms?: ProductRequisitionForm[];
}
