import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotificationUseCase } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly countFromRecipientUseCase: CountRecipientNotificationsUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly getFromRecipientUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notification_id: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipient_id: string) {
    const { count } = await this.countFromRecipientUseCase.execute({
      recipient_id: recipient_id,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipient_id: string) {
    const { notifications } = await this.getFromRecipientUseCase.execute({
      recipient_id,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notification_id: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notification_id: id,
    });
  }

  @Post()
  async sendNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
