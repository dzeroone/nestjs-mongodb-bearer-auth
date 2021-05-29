import { IsEmail, IsNotEmpty, Validate } from "class-validator"
import { EmailNotExistsRule } from "src/validators"

export class SignupDto {
  @IsEmail()
  @Validate(EmailNotExistsRule)
  email: string

  @IsNotEmpty()
  password: string
}