import { User } from 'user/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from 'user/base.entity';
import { AutoMap } from '@automapper/classes';

@Entity('notification_tbl')
export class Notification extends Base {
  @ManyToOne(() => User, (user) => user.notificarions)
  @JoinColumn({ name: 'user_id_column' })
  user?: User;

  @Column({ name: 'message_column' })
  @AutoMap()
  message?: string;

  @Column({ name: 'type_column' })
  @AutoMap()
  type?: string;

  @Column({ name: 'url_column', nullable: true })
  @AutoMap()
  url?: string;

  @Column({ name: 'is_read_column', default: false })
  @AutoMap()
  isRead?: boolean;
}
