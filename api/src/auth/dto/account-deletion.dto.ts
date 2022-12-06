import { IsString } from "class-validator";

export class AccountDeletionDto {
  @IsString()
  currentPassword: string;
}