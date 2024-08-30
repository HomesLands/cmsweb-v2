import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "@entities/user.entity";
import { Site } from "@entities/site.entity";
import { BaseEntity } from "@entities/base.entity";

@Entity("user_site_tbl") // Specify the name of the join table
export class UserSite extends BaseEntity{
    @ManyToOne(() => User, (user) => user.sites)
    @JoinColumn({ name: "user_id_column" })
    user?: User;

    @ManyToOne(() => Site, (site) => site.users)
    @JoinColumn({ name: "site_id_column" })
    site?: Site;
}
