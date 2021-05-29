import { BadRequestException, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "src/user/user.service";

@ValidatorConstraint({ name: 'EmailNotExists', async: true })
@Injectable()
export class EmailNotExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string) {
    try {
      const user = await this.userService.findOneByEmail(value);
      if(user) {
        throw new BadRequestException()
      }
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email already exist`;
  }
}
