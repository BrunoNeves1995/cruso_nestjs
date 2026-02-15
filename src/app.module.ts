import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProjectsModule } from './modules/projects/projects.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TasksController } from './modules/tasks/tasks.controller';
import { TasksService } from './modules/tasks/tasks.service';

@Module({
  imports: [ProjectsModule, PrismaModule],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
