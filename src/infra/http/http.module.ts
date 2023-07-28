import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
