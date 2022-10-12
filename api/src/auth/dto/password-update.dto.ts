import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class PasswordUpdateDto {
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          'The password must have a Uppercase, lowercase letter and a number',
    })
    currentPassword: string;
  
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'The password must have a Uppercase, lowercase letter and a number',
    })
    newPassword: string;
    
    @IsString()
    @IsOptional()
    @IsEmail()
    newEmail: string;

    @IsString()
    type: string;
}