import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotificationUseCase } from '../send-notification';

let notificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe('Send notification', () => {
  beforeEach(() => {
    notificationRepository = new InMemoryNotificationRepository();
    sut = new SendNotificationUseCase(notificationRepository);
  });
  it('should be able to send a notification', async () => {
    const { notification } = await sut.execute({
      category: 'social',
      content: 'This is a notification',
      recipientId: 'example-recipient-id',
    });

    expect(notificationRepository.items).toHaveLength(1);
    expect(notificationRepository.items[0]).toEqual(notification);
  });
});
