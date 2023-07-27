import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from 'src/application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const { category, content, createdAt, readAt, recipientId } = notification;

    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category,
        content: content.value,
        recipientId,
        createdAt,
        readAt,
      },
    });
  }
}
