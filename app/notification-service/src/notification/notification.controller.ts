import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/request.dto';

@Controller()
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @EventPattern('product-requsition-form')
  async createNotification(@Payload() requestData: CreateNotificationDto) {
    console.log('Received message:', requestData);
    await this.notificationService.createNotification(requestData);
  }
}
