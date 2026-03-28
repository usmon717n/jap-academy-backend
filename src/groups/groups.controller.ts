import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { TeacherOrAdminGuard } from '../common/guards/teacher-or-admin.guard';
import { CreateGroupDto, AssignDto } from './groups.dto';

@ApiTags('Groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  // Admin: all groups
  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  // Teacher: my groups
  @Get('my')
  async myGroups(@Request() req: any) {
    if (req.user.role === 'ADMIN') return this.groupsService.findAll();
    if (req.user.role === 'TEACHER') return this.groupsService.findByTeacher(req.user.sub);
    return this.groupsService.findByStudent(req.user.sub);
  }

  // Get single group
  @UseGuards(TeacherOrAdminGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @Request() req: any) {
    return this.groupsService.findById(id, req.user.sub, req.user.role);
  }

  // Get group results
  @UseGuards(TeacherOrAdminGuard)
  @Get(':id/results')
  async getResults(@Param('id') id: string, @Request() req: any) {
    // Verify access first
    await this.groupsService.findById(id, req.user.sub, req.user.role);
    return this.groupsService.getGroupResults(id);
  }

  // Admin: create group
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  // Admin: update group
  @UseGuards(AdminGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateGroupDto>) {
    return this.groupsService.update(id, dto);
  }

  // Admin: delete group
  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  // Admin: assign teacher
  @UseGuards(AdminGuard)
  @Post(':id/teachers')
  async assignTeacher(@Param('id') id: string, @Body() dto: AssignDto) {
    return this.groupsService.assignTeacher(id, dto.userId);
  }

  // Admin: remove teacher
  @UseGuards(AdminGuard)
  @Delete(':id/teachers/:userId')
  async removeTeacher(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupsService.removeTeacher(id, userId);
  }

  // Teacher/Admin: add student
  @UseGuards(TeacherOrAdminGuard)
  @Post(':id/members')
  async addMember(@Param('id') id: string, @Body() dto: AssignDto, @Request() req: any) {
    await this.groupsService.findById(id, req.user.sub, req.user.role);
    return this.groupsService.addMember(id, dto.userId);
  }

  // Teacher/Admin: remove student
  @UseGuards(TeacherOrAdminGuard)
  @Delete(':id/members/:userId')
  async removeMember(@Param('id') id: string, @Param('userId') userId: string, @Request() req: any) {
    await this.groupsService.findById(id, req.user.sub, req.user.role);
    return this.groupsService.removeMember(id, userId);
  }

  // Teacher/Admin: assign topic
  @UseGuards(TeacherOrAdminGuard)
  @Post(':id/topics')
  async assignTopic(@Param('id') id: string, @Body() dto: AssignDto, @Request() req: any) {
    await this.groupsService.findById(id, req.user.sub, req.user.role);
    return this.groupsService.assignTopic(id, dto.userId); // userId = topicId here
  }

  // Teacher/Admin: remove topic
  @UseGuards(TeacherOrAdminGuard)
  @Delete(':id/topics/:topicId')
  async removeTopic(@Param('id') id: string, @Param('topicId') topicId: string, @Request() req: any) {
    await this.groupsService.findById(id, req.user.sub, req.user.role);
    return this.groupsService.removeTopic(id, topicId);
  }

  // Student: join group by code (any logged-in user)
  @Post('join')
  async joinByCode(@Request() req: any, @Body() body: { code: string }) {
    return this.groupsService.joinByCode(req.user.sub, body.code);
  }

  // Admin: regenerate join code
  @UseGuards(AdminGuard)
  @Post(':id/regenerate-code')
  async regenerateCode(@Param('id') id: string) {
    return this.groupsService.regenerateCode(id);
  }
}
