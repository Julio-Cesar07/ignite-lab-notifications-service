import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationsUseCaseRequest {
  recipient_id: string;
}

interface GetRecipientNotificationsUseCaseResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipient_id,
  }: GetRecipientNotificationsUseCaseRequest): Promise<GetRecipientNotificationsUseCaseResponse> {
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipient_id);

    return {
      notifications,
    };
  }
}
