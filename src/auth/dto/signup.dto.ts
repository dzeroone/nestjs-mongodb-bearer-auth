import { IsEmail, IsNotEmpty, Validate } from "class-validator"
import { EmailNotExistsRule } from "src/validators/email-not-exists-rule.validator"

export class SignupDto {
  @IsEmail()
  @Validate(EmailNotExistsRule)
  email: string

  @IsNotEmpty()
  password: string
}