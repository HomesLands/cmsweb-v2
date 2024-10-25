import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationMapper } from './notification.mapper';
import { UserModule } from 'user/user.module';
import { NotificationSubscriber } from './notification.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UserModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationMapper, NotificationSubscriber],
  exports: [TypeOrmModule],
})
export class NotificationModule {}
