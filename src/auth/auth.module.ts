import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[UsersModule,
    JwtModule.registerAsync({inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          global:true,
          secret:config.get<string>('JWT_SECRET'),
          signOptions:{expiresIn:config.get<string>('JWT_EXPIRES_IN')}
        }
      }
    })
  ],
  controllers:[AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
