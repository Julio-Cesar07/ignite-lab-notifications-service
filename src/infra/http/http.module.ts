import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notification.controller';
import { SendNotificationUseCase } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}
