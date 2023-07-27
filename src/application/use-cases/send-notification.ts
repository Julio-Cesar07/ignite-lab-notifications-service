import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { Content } from '../entities/value-object/content';
import { NotificationRepository } from '../repositories/notification-repository';

interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationUseCaseResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    category,
    content,
    recipientId,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
