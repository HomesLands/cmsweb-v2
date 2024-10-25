import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { Notification } from "@entities/notification.entity";

class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(Notification, dataSource);
  }
}

export default new NotificationRepository();
