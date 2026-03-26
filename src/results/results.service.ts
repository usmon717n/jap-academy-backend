import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(data: {
    userId: string;
    topicId: string;
    answers: Record<string, number>;
    timeSpent: number;
  }) {
    const questions = await this.prisma.question.findMany({
      where: { topicId: data.topicId },
      orderBy: { createdAt: 'asc' },
    });

    const totalQuestions = questions.length;
    let correctCount = 0;

    const answerDetails: Array<{
      questionId: string;
      userAnswer: number;
      correctAnswer: number;
      isCorrect: boolean;
    }> = [];

    questions.forEach((q, index) => {
      const userAnswer = data.answers[String(index)];
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) correctCount++;
      answerDetails.push({
        questionId: q.id,
        userAnswer: userAnswer ?? -1,
        correctAnswer: q.correct,
        isCorrect,
      });
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return this.prisma.result.create({
      data: {
        userId: data.userId,
        topicId: data.topicId,
        totalQuestions,
        correctCount,
        percentage,
        timeSpent: data.timeSpent,
        answers: answerDetails,
      },
      include: { topic: { select: { name: true, symbol: true, color: true } } },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.result.findMany({
      where: { userId },
      include: { topic: { select: { name: true, symbol: true, color: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.result.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        topic: { select: { name: true, symbol: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}
