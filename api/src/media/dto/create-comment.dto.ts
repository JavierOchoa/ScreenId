import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    name: string;

    @IsString()
    body: string;

    @IsString()
    mediaType: string;

    @IsString()
    mediaId: string;
}