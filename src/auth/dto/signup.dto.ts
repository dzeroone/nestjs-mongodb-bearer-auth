import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Validate } from "class-validator"
import { EmailNotExistsRule } from "src/validators/email-not-exists-rule.validator"

export class SignupDto {
  @ApiProperty()
  @IsEmail()
  @Validate(EmailNotExistsRule)
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}