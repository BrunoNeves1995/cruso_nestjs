import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProjectsModule } from './modules/projects/projects.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ProjectsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
