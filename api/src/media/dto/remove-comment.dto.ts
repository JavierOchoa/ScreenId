import { IsString } from 'class-validator';

export class RemoveCommentDto {
  @IsString()
  id: string;
}