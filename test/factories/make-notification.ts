import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/value-object/content';

export function makeNotification(override: Partial<NotificationProps> = {}) {
  const notification = new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade'),
    recipientId: 'example-recipient-id',
    ...override,
  });

  return notification;
}
