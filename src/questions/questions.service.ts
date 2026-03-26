import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByTopic(topicId: string) {
    return this.prisma.question.findMany({
      where: { topicId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(data: {
    topicId: string;
    text: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correct: number;
  }) {
    return this.prisma.question.create({ data });
  }

  async update(
    id: string,
    data: Partial<{
      text: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correct: number;
    }>,
  ) {
    await this.ensureExists(id);
    return this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.question.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const q = await this.prisma.question.findUnique({ where: { id } });
    if (!q) throw new NotFoundException('Savol topilmadi');
  }
}
