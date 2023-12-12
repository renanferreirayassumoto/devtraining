import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [CoursesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
