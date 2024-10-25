import { MappingProfile, Mapper, createMap } from "@automapper/core";
import { NotificationResponseDto } from "@dto/response";
import { Notification } from "@entities/notification.entity";

export const notificationMapper: MappingProfile = (mapper: Mapper) => {
  // Map request object to entity
  createMap(mapper, Notification, NotificationResponseDto);
};
