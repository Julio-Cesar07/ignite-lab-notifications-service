import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/make-notification';
import { CountRecipientNotificationsUseCase } from '../count-recipient-notifications';

let notificationRepository: InMemoryNotificationRepository;
let sut: CountRecipientNotificationsUseCase;

describe('Count recipients notifications', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new CountRecipientNotificationsUseCase(notificationRepository);
  });

  it('should be able to count recipient notifications', async () => {
    const recipientId = 'recipient-1';
    for (let i = 0; i < 3; i++)
      notificationRepository.create(
        makeNotification({
          recipientId,
        }),
      );

    notificationRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await sut.execute({
      recipient_id: recipientId,
    });

    expect(count).toEqual(3);
  });
});
