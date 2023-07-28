import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      data: raw,
      where: {
        id: raw.id,
      },
    });
  }

  async findById(notification_id: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notification_id,
      },
    });

    if (!notification) throw new NotificationNotFound();

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipient_id: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId: recipient_id,
      },
    });

    return notifications.map((item) => PrismaNotificationMapper.toDomain(item));
  }

  async countByRecipientId(recipient_id: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId: recipient_id,
      },
    });

    return count;
  }
}
