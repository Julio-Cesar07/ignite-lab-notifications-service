import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex < 0) throw new NotificationNotFound();

    this.items[notificationIndex] = notification;
  }

  async findById(notification_id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id === notification_id);

    return notification ?? null;
  }

  async countByRecipientId(recipient_id: string): Promise<number> {
    return this.items.filter((item) => item.recipientId === recipient_id)
      .length;
  }

  async findManyByRecipientId(recipient_id: string): Promise<Notification[]> {
    const notifications = this.items.filter(
      (item) => item.recipientId === recipient_id,
    );

    return notifications;
  }
}
