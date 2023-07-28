import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/make-notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { UnreadNotificationUseCase } from '../unread-notification';

let notificationRepository: InMemoryNotificationRepository;
let sut: UnreadNotificationUseCase;

describe('Unread notification', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new UnreadNotificationUseCase(notificationRepository);
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    notificationRepository.create(notification);

    await sut.execute({
      notification_id: notification.id,
    });

    expect(notificationRepository.items[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    expect(() =>
      sut.execute({
        notification_id: 'example-id-not-exist',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
