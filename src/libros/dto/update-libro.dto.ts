import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';
import { IsString, IsInt, IsBoolean, IsOptional, MinLength, IsPositive } from 'class-validator';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {

    @IsString()
    @IsOptional()
    @MinLength(1)
    title: string;

    @IsString()
    @IsOptional()
    @MinLength(1)
    author: string;
    
    @IsInt()
    @IsOptional()
    @IsPositive()
    year: number;

    @IsBoolean()
    @IsOptional()
    disponibilidad?: boolean;
    
}
