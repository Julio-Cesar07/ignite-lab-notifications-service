import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/make-notification';
import { GetRecipientNotificationsUseCase } from '../get-recipient-notifications';

let notificationRepository: InMemoryNotificationRepository;
let sut: GetRecipientNotificationsUseCase;

describe('Get recipients notifications', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new GetRecipientNotificationsUseCase(notificationRepository);
  });

  it('should be able to get recipient notifications', async () => {
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

    const { notifications } = await sut.execute({
      recipient_id: recipientId,
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
