import { mapper } from "@mappers";
import { TNotificationQueryRequest, TPaginationOptionResponse } from "@types";
import { NotificationResponseDto } from "@dto/response";
import { notificationRepository } from "@repositories";
import { GlobalError, ErrorCodes } from "@exception";

import { Equal, FindOptionsWhere } from "typeorm";
import { parsePagination } from "@utils";
import { Notification } from "@entities";

class ProductService {
  public async getAllNotifications(
    options: TNotificationQueryRequest
  ): Promise<TPaginationOptionResponse<NotificationResponseDto[]>> {
    const conditions: FindOptionsWhere<Notification> = {};
    if (options.userId) {
      conditions.user = {
        id: Equal(options.userId),
      };
    }
    // Get the total number of products
    const totalNotifications = await notificationRepository.count({
      where: conditions,
    });

    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination(options);

    // Calculate pagination details
    const totalPages = Math.ceil(totalNotifications / pageSize);

    const products = await notificationRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: ["user"],
      where: conditions,
    });

    // Map the products to the DTO
    const results = mapper.mapArray(
      products,
      Notification,
      NotificationResponseDto
    );

    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async readNotification(
    slug: string
  ): Promise<NotificationResponseDto> {
    const notification = await notificationRepository.findOne({
      where: {
        slug,
      },
    });
    if (!notification) throw new GlobalError(ErrorCodes.NOTIFICATION_NOT_FOUND);

    Object.assign(notification, { isRead: true });
    const updated = await notificationRepository.save(notification);
    return mapper.map(updated, Notification, NotificationResponseDto);
  }

  public async getNotification(slug: string): Promise<NotificationResponseDto> {
    const notification = await notificationRepository.findOne({
      where: {
        slug,
      },
    });
    if (!notification) throw new GlobalError(ErrorCodes.NOTIFICATION_NOT_FOUND);

    return mapper.map(notification, Notification, NotificationResponseDto);
  }
}

export default new ProductService();
