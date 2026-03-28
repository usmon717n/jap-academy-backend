import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Admin: all groups ───
  async findAll() {
    return this.prisma.group.findMany({
      include: {
        _count: { select: { members: true, teachers: true, topics: true } },
        teachers: { include: { teacher: { select: { id: true, firstName: true, lastName: true, email: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── Teacher: only assigned groups ───
  async findByTeacher(teacherId: string) {
    const assignments = await this.prisma.groupTeacher.findMany({
      where: { teacherId },
      include: {
        group: {
          include: {
            _count: { select: { members: true, topics: true } },
            topics: { include: { topic: { select: { id: true, name: true, symbol: true, color: true } } } },
          },
        },
      },
    });
    return assignments.map((a: any) => a.group);
  }

  // ─── Get single group with details ───
  async findById(id: string, userId?: string, role?: string) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        members: {
          include: { user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } } },
        },
        teachers: {
          include: { teacher: { select: { id: true, firstName: true, lastName: true, email: true } } },
        },
        topics: {
          include: { topic: { select: { id: true, name: true, symbol: true, color: true, number: true } } },
        },
      },
    });
    if (!group) throw new NotFoundException('Guruh topilmadi');

    // Teacher can only see assigned groups
    if (role === 'TEACHER' && userId) {
      const isAssigned = group.teachers.some((t: any) => t.teacherId === userId);
      if (!isAssigned) throw new ForbiddenException('Bu guruhga ruxsat yo\'q');
    }

    return group;
  }

  // ─── Admin: create group ───
  async create(data: { name: string; color?: string }) {
    return this.prisma.group.create({
      data: { name: data.name, color: data.color || '#ea580c' },
    });
  }

  // ─── Admin: update group ───
  async update(id: string, data: { name?: string; color?: string; isActive?: boolean }) {
    await this.ensureExists(id);
    return this.prisma.group.update({ where: { id }, data });
  }

  // ─── Admin: delete group ───
  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.group.delete({ where: { id } });
  }

  // ─── Admin: assign teacher to group ───
  async assignTeacher(groupId: string, teacherId: string) {
    await this.ensureExists(groupId);
    const teacher = await this.prisma.user.findUnique({ where: { id: teacherId } });
    if (!teacher || teacher.role !== 'TEACHER') throw new NotFoundException('Teacher topilmadi');

    return this.prisma.groupTeacher.upsert({
      where: { groupId_teacherId: { groupId, teacherId } },
      create: { groupId, teacherId },
      update: {},
    });
  }

  // ─── Admin: remove teacher from group ───
  async removeTeacher(groupId: string, teacherId: string) {
    return this.prisma.groupTeacher.deleteMany({ where: { groupId, teacherId } });
  }

  // ─── Teacher/Admin: add student to group ───
  async addMember(groupId: string, userId: string) {
    await this.ensureExists(groupId);
    return this.prisma.groupMember.upsert({
      where: { groupId_userId: { groupId, userId } },
      create: { groupId, userId },
      update: {},
    });
  }

  // ─── Teacher/Admin: remove student from group ───
  async removeMember(groupId: string, userId: string) {
    return this.prisma.groupMember.deleteMany({ where: { groupId, userId } });
  }

  // ─── Teacher/Admin: assign topic to group ───
  async assignTopic(groupId: string, topicId: string) {
    await this.ensureExists(groupId);
    return this.prisma.groupTopic.upsert({
      where: { groupId_topicId: { groupId, topicId } },
      create: { groupId, topicId },
      update: {},
    });
  }

  // ─── Teacher/Admin: remove topic from group ───
  async removeTopic(groupId: string, topicId: string) {
    return this.prisma.groupTopic.deleteMany({ where: { groupId, topicId } });
  }

  // ─── Get group members' results ───
  async getGroupResults(groupId: string) {
    const members = await this.prisma.groupMember.findMany({
      where: { groupId },
      select: { userId: true },
    });
    const userIds = members.map((m: { userId: string }) => m.userId);

    return this.prisma.result.findMany({
      where: { userId: { in: userIds } },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        topic: { select: { name: true, symbol: true, color: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  // ─── Student: get my groups ───
  async findByStudent(userId: string) {
    const memberships = await this.prisma.groupMember.findMany({
      where: { userId },
      include: {
        group: {
          include: {
            topics: { include: { topic: { include: { _count: { select: { questions: true } } } } } },
          },
        },
      },
    });
    return memberships.map((m: any) => m.group);
  }

  private async ensureExists(id: string) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Guruh topilmadi');
  }
}
