import { NotificationRepository } from '@application/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';

interface ReadNotificationUseCaseRequest {
  notification_id: string;
}

type ReadNotificationUseCaseResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notification_id,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(
      notification_id,
    );

    if (!notification) throw new NotificationNotFound();

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
