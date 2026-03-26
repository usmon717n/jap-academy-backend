import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.topic.findMany({
      where: { isActive: true },
      include: { _count: { select: { questions: true } } },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findById(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!topic) throw new NotFoundException('Mavzu topilmadi');
    return topic;
  }

  async create(data: { name: string; symbol: string; number: string; color: string }) {
    const count = await this.prisma.topic.count();
    return this.prisma.topic.create({
      data: { ...data, sortOrder: count + 1 },
    });
  }

  async update(id: string, data: Partial<{ name: string; symbol: string; color: string; isActive: boolean }>) {
    await this.ensureExists(id);
    return this.prisma.topic.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.topic.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new NotFoundException('Mavzu topilmadi');
  }
}
