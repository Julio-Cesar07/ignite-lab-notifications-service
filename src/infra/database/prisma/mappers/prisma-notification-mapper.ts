import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/value-object/content';
import { Prisma, Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): Prisma.NotificationCreateInput {
    return {
      category: notification.category,
      content: notification.content.toString(),
      id: notification.id,
      recipientId: notification.recipientId,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}
