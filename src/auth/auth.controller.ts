import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

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
