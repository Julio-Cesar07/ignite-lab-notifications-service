import { NotificationRepository } from '@application/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';

interface CancelNotificationUseCaseRequest {
  notification_id: string;
}

type CancelNotificationUseCaseResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notification_id,
  }: CancelNotificationUseCaseRequest): Promise<CancelNotificationUseCaseResponse> {
    const notification = await this.notificationRepository.findById(
      notification_id,
    );

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
