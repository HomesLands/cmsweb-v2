import { Entity, Column, OneToMany, ManyToOne, JoinColumn, AfterLoad } from "typeorm";
import { AutoMap } from "@automapper/classes";

import { Base, ProductWarehouse, RequestProduct, Unit } from "@entities";
import { productRepository } from "@repositories";

@Entity("product_tbl")
export class Product extends Base {
  @Column({ name: "name_column", unique: true })
  @AutoMap()
  name?: string;

  @Column({ name: "quantity_column", default: 0 })
  @AutoMap()
  quantity?: number;

  @Column({ name: "code_column", nullable: true })
  @AutoMap()
  code?: string;

  @Column({ name: "provider_column" })
  @AutoMap()
  provider?: string;

  @Column({ name: "description_column", nullable: true, type: "text" })
  @AutoMap()
  description?: string;

  @ManyToOne(() => Unit, (unit) => unit.products)
  @JoinColumn({ name: "unit_column" })
  unit?: Unit;

  // a product have many request product
  @OneToMany(() => RequestProduct, (requestProduct) => requestProduct.product)
  requestProducts?: RequestProduct[];

  // a product have many productWarehouse
  @OneToMany(() => ProductWarehouse, 
    (productWarehouse) => productWarehouse.product)
  productWarehouses?: ProductWarehouse[];

  // Phương thức tính tổng quantity từ các ProductWarehouse
  // async updateTotalQuantity() {
  //   if (this.productWarehouses && this.productWarehouses.length > 0) {
  //     this.quantity = this.productWarehouses.reduce((total, pw) => total + (pw.quantity || 0), 0);
  //   } else {
  //     this.quantity = 0; // Không có ProductWarehouse nào, quantity mặc định bằng 0
  //   }
  //   // await this.save(); // Cập nhật lại quantity cho Product
  //   await productRepository.save(this);
  // }

  // Hook để tự động tải lại quantity sau khi Product được tải
  // @AfterLoad()
  // async loadTotalQuantity() {
  //   await this.updateTotalQuantity();
  // }
}
