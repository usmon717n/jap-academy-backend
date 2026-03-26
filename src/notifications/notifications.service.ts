import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async markAsRead(id: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  // Every day at 09:00 — send test reminder to all students
  @Cron('0 9 * * *')
  async sendDailyTestReminder() {
    this.logger.log('Sending daily test reminders...');

    const students = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true },
    });

    const messages = [
      'Kunlik test yechish vaqti keldi! Bilimingizni sinab ko\'ring.',
      'Bugun ham kimyo testlarini yechishni unutmang!',
      'Har kungi mashq — muvaffaqiyat kaliti! Testlarni yeching.',
      'Kimyo bilimlaringizni mustahkamlash vaqti keldi!',
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const notifications = students.map((student: { id: string }) => ({
      userId: student.id,
      title: 'Test vaqti',
      message: randomMessage,
    }));

    if (notifications.length > 0) {
      await this.prisma.notification.createMany({ data: notifications });
      this.logger.log(`Sent ${notifications.length} daily reminders`);
    }
  }
}
