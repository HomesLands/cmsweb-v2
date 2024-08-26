import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from '@entities/base.entity'

@Entity()
export class Image extends BaseEntity{
    @Column({ type: 'mediumblob' })
    data: Blob | undefined

    @Column({ type: 'varchar' })
    fileName: string | undefined
}