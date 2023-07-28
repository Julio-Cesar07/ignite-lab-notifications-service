import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract findById(notification_id: string): Promise<Notification | null>;
  abstract findManyByRecipientId(recipient_id: string): Promise<Notification[]>;
  abstract countByRecipientId(recipient_id: string): Promise<number>;
}
