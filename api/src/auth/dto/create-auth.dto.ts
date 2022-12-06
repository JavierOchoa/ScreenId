import { IsEmail, IsString, MaxLength, MinLength, Matches } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsEmail({}, { message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number\n',
  })
  password: string;

  @IsString()
  @MinLength(1, { message: 'Name is required' })
  fullName: string;
}
