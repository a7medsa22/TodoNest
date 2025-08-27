import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('api/v1/users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async registerUser(@Body() body:SignupDto) {
    return this.authService.signUp(body);
  }

  @Post('/login')
  async loginUser(@Body() body:LoginDto) {
    return this.authService.login(body);
  }
}
