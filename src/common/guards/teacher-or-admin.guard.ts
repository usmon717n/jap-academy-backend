import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TeacherOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.user?.role;
    if (role !== 'ADMIN' && role !== 'TEACHER') {
      throw new ForbiddenException('Faqat teacher yoki admin uchun');
    }
    return true;
  }
}
