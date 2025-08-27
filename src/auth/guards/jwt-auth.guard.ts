import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable, retry } from "rxjs";
import { CURRENT_USER_KEY } from "src/util/constant";

@Injectable()
export class JwtAuthGuard implements CanActivate{
   constructor(private configService:ConfigService,
    private jwtService:JwtService
   ){}

   async canActivate(context: ExecutionContext) {
       const request:Request = context.switchToHttp().getRequest();
     const [type,token] = request.headers.authorization?.split(' ')??[];
        
     if(token && type === 'Bearer'){
        try {
            const payload = await this.jwtService.verifyAsync(token,{
            secret:this.configService.get<string>('JWT_SECRET')})
            request[CURRENT_USER_KEY] = payload
        } catch (error) {
       throw new UnauthorizedException('Invalid token');

        }
     }else{
        throw new UnauthorizedException('access denied ,Invalid token');
    }
      return true
   }
   
}