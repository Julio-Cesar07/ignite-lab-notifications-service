import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from 'src/application/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }
}
