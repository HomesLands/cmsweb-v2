import { Entity, Column } from "typeorm";
import { Base } from "./base.entity";

@Entity("invalid_token_tbl")
export class InvalidToken extends Base {
  @Column({ name: "token_id_column" })
  tokenId?: string;

  @Column({ name: "expiry_date_column" })
  expiryDate?: Date;
}
