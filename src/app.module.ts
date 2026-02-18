import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { UsersModule } from './modules/users/users.module'
import { CollaboratorsModule } from './modules/collaborators/collaborators.module';

@Module({
  imports: [ProjectsModule, PrismaModule, TasksModule, UsersModule, CollaboratorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
