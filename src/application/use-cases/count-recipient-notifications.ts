import { NotificationRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsUseCaseRequest {
  recipient_id: string;
}

interface CountRecipientNotificationsUseCaseResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipient_id,
  }: CountRecipientNotificationsUseCaseRequest): Promise<CountRecipientNotificationsUseCaseResponse> {
    const count = await this.notificationRepository.countByRecipientId(
      recipient_id,
    );

    return {
      count,
    };
  }
}
