import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[UsersModule,PrismaModule,JwtModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
