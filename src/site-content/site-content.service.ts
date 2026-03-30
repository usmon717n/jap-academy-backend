import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SiteContentService {
  constructor(private readonly prisma: PrismaService) {}

  async get(key: string) {
    const item = await this.prisma.siteContent.findUnique({ where: { key } });
    return item ? item.value : null;
  }

  async getAll() {
    const items = await this.prisma.siteContent.findMany();
    const result: Record<string, any> = {};
    items.forEach((item: any) => { result[item.key] = item.value; });
    return result;
  }

  async set(key: string, value: any) {
    return this.prisma.siteContent.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}
