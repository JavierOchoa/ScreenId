import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateMediaDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    @IsOptional()
    profilePath?: string;
    
    @IsString()
    title: string;

    @IsIn(['movie', 'tv'])
    type: string;
}
