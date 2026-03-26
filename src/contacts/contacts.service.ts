import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { fullName: string; phone: string; message?: string }) {
    return this.prisma.contact.create({
      data: { fullName: data.fullName, phone: data.phone, message: data.message || '' },
    });
  }

  async findAll() {
    return this.prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async markHandled(id: string) {
    return this.prisma.contact.update({
      where: { id },
      data: { isHandled: true },
    });
  }
}
