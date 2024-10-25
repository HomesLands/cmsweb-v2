import { Entity, Column, OneToMany } from 'typeorm';

import { Notification } from 'notification/notification.entity';
import { Base } from './base.entity';

@Entity('user_tbl')
export class User extends Base {
  @Column({ name: 'full_name_column' })
  fullname?: string;

  @Column({ name: 'username_column' })
  username?: string;

  @Column({ name: 'password_column' })
  password?: string;

  @Column({ name: 'dob_column', nullable: true })
  dob?: string;

  @Column({ name: 'gender_column', nullable: true })
  gender?: string; // Gender in enums

  @Column({ name: 'address_column', nullable: true })
  address?: string;

  @Column({ name: 'phone_number_column', nullable: true })
  phoneNumber?: string;

  @Column({ name: 'avatar_column', nullable: true })
  avatar?: string;

  @Column({ name: 'signature_column', nullable: true })
  signature?: string;

  @OneToMany(() => Notification, (notificarion) => notificarion.user)
  notificarions?: Notification[];
}
