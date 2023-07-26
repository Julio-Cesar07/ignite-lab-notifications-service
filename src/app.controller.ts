import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list(): object {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    console.log(body);

    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        category,
        content,
        recipientId,
      },
    });
  }
}
