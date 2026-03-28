import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: 'TEACHER' },
      select: {
        id: true, email: true, firstName: true, lastName: true, phone: true, createdAt: true,
        teacherGroups: {
          include: { group: { select: { id: true, name: true, color: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictException('Bu email allaqachon mavjud');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || '',
        role: 'TEACHER',
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
  }

  async remove(id: string) {
    const teacher = await this.prisma.user.findUnique({ where: { id } });
    if (!teacher || teacher.role !== 'TEACHER') throw new NotFoundException('Teacher topilmadi');
    return this.prisma.user.delete({ where: { id } });
  }

  async getAllStudents() {
    return this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true },
      orderBy: { firstName: 'asc' },
    });
  }
}
