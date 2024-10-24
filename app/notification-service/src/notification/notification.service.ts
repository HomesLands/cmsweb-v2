import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/request.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { User } from 'user/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  async createNotification(requestData: CreateNotificationDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: requestData.userId,
      },
    });
    if (!user) throw new Error('User not found');

    const notification = this.mapper.map(
      requestData,
      CreateNotificationDto,
      Notification,
    );
    Object.assign(notification, { user });

    await this.notificationRepository.save(notification);
  }
}
