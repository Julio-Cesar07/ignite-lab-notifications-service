import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotificationUseCase } from '../cancel-notification';
import { makeNotification } from '@test/factories/make-notification';
import { NotificationNotFound } from '../errors/notification-not-found';

let notificationRepository: InMemoryNotificationRepository;
let sut: CancelNotificationUseCase;

describe('Cancel notification', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new CancelNotificationUseCase(notificationRepository);
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    notificationRepository.create(notification);

    await sut.execute({
      notification_id: notification.id,
    });

    expect(notificationRepository.items[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() =>
      sut.execute({
        notification_id: 'example-id-not-exist',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
