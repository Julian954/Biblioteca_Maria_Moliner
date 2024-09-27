import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateLibroDto {

    @IsString()
    title: string;

    @IsString()
    author: string;
    
    @IsInt()
    year: number;

    @IsBoolean()
    @IsOptional()
    disponibilidad?: boolean;
}
