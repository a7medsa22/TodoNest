import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ // Config Module (Global)
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
  }),
  // Modules
 
TasksModule,
 UsersModule,
  AuthModule,
   PrismaModule,
   JwtModule
  ],
 
})
export class AppModule {}
