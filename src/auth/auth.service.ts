import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupDto  } from './dto/signup.dto';
import bcrypt from 'bcrypt';
import { AuthResponse, UserResponse } from 'src/util/user.type';
import { UserRole } from 'src/util/user-role.enum';
import { LoginDto } from './dto/login.dto';
import { dot } from 'node:test/reporters';

@Injectable()
export class AuthService {
    constructor(private readonly userSevice:UsersService,
        private jwtService:JwtService
    ){}
    public async signUp(dto:SignupDto):Promise<AuthResponse> {
        await this.validateEmailNotExists(dto.email);
        
       const hashpass =  await this.hashPassword(dto.password);

          const user = await this.userSevice.createUser({
      ...dto,
      password: hashpass,
      role: dto.role || UserRole.USER
    });
    return this.generateAuthResponse(user);
    };


    

    async login(dto:LoginDto):Promise<AuthResponse>{
        const user = await this.userSevice.findOneByEmailWithPassword(dto.email);
        if(!user) throw new BadRequestException('Invalid credentials');
        await this.validatePassword(dto.password,user.password)
        const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    };
    return this.generateAuthResponse(userResponse);
    };
    

    private async validateEmailNotExists(email:string) :Promise<void> {
        const exists =await this.userSevice.findOneByEmail(email)
   if(exists) throw new BadRequestException("Email Aready in user")
    }
    private async hashPassword(password:string) :Promise<string> {
    const salt = await bcrypt.genSalt(10); 
        return await bcrypt.hash(password,salt);

    }
    private async validatePassword(password:string,hashPassword:string) :Promise<void> {
      const isValid =await bcrypt.compare(password,hashPassword)
      if(!isValid) throw new BadRequestException("Invalid credentials")

    }  
    private async generateAuthResponse(user:UserResponse):Promise<AuthResponse>{
        const payload = {
            sub:user.id,
            email:user.email,
            role:user.role
        };
        const acssess_token = await this.jwtService.signAsync(payload);

        return {acssess_token,user};
    }


}
