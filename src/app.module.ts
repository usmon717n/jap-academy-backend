import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ContactsModule } from './contacts/contacts.module';
import { GroupsModule } from './groups/groups.module';
import { TeachersModule } from './teachers/teachers.module';
import { SiteContentModule } from './site-content/site-content.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    TopicsModule,
    QuestionsModule,
    ResultsModule,
    NotificationsModule,
    ContactsModule,
    GroupsModule,
    TeachersModule,
    SiteContentModule,
  ],
})
export class AppModule {}
