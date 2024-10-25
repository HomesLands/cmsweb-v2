import { generate } from 'short-uuid';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Notification } from './notification.entity';

@EventSubscriber()
export class NotificationSubscriber
  implements EntitySubscriberInterface<Notification>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Notification;
  }

  beforeInsert(event: InsertEvent<Notification>) {
    const slug = generate();
    Object.assign(event.entity, {
      slug,
    });
    console.log(`BEFORE NOTIFICATION INSERTED: `, event.entity);
  }
}
