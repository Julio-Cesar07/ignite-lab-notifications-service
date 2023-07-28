import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/make-notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { ReadNotificationUseCase } from '../read-notification';

let notificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe('Read notification', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase(notificationRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    notificationRepository.create(notification);

    await sut.execute({
      notification_id: notification.id,
    });

    expect(notificationRepository.items[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    expect(() =>
      sut.execute({
        notification_id: 'example-id-not-exist',
      }),
    ).rejects.toBeInstanceOf(NotificationNotFound);
  });
});
