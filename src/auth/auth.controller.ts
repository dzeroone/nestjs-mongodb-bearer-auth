import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: SignupDto
  ) {
    console.log('sdfsdf')
    return this.authService.signup(body)
  }

  @Post('signin')
  async signin(
    @Body() body: SigninDto
  ) {
    return this.authService.signin(body)
  }
}
