import { Entity, Column } from "typeorm";
import { BaseEntity } from '@entities/base.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User extends BaseEntity {
    @AutoMap()
    @Column({ type: 'varchar' })
    firstName: string | undefined

    @AutoMap()
    @Column({ type: 'varchar' })
    lastName: string | undefined

    @AutoMap()
    @Column({ type: 'varchar' })
    userName: string | undefined

    @Column({ type: 'varchar' })
    password: string | undefined
}