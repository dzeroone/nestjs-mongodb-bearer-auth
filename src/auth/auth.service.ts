import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  async signup(body: SignupDto) {
    const userObj = await this.userService.findOneByEmail(body.email)
    if(userObj) throw new BadRequestException()

    body.password = await bcrypt.hash(body.password, 10)
    const newUserObj = await this.userService.create(body);
    const newTokenObj = await this.tokenService.create({
      user: newUserObj.id
    })
    return {
      token: newTokenObj.token,
      userId: newUserObj.id
    }
  }

  async signin(body: SigninDto) {
    const userObj = await this.userService.findOneByEmail(body.email)
    if(!userObj) throw new BadRequestException()

    if(!await bcrypt.compare(body.password, userObj.password)) {
      throw new BadRequestException()
    }

    const newTokenObj = await this.tokenService.create({
      user: userObj.id
    })
    return {
      token: newTokenObj.token,
      userId: userObj.id
    }
  }

  async validateUser(token: string): Promise<User> {
    const tokenObj = await this.tokenService.getTokenObjByToken(token)
    if(!tokenObj) throw new UnauthorizedException();
    return tokenObj.user
  }
}
