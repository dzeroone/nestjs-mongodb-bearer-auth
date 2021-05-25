import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('me')
  @UseGuards(TokenAuthGuard)
  async getMe(
    @Req() req
  ) {
    return req.user
  }
}
