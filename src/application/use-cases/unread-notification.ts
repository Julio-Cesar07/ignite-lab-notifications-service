import { NotificationRepository } from '@application/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';

interface UnreadNotificationUseCaseRequest {
  notification_id: string;
}

type UnreadNotificationUseCaseResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notification_id,
  }: UnreadNotificationUseCaseRequest): Promise<UnreadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(
      notification_id,
    );

    if (!notification) throw new NotificationNotFound();

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
