import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';
import { IsString, IsInt, IsBoolean, IsOptional, MinLength, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {

    @ApiProperty({ description: 'Titulo del Libro', example: "Piedras de acero" })
    @IsString()
    @IsOptional()
    @MinLength(1)
    title: string;

    @ApiProperty({ description: 'Nombre del autor', example: "Jose Gaspar" })
    @IsString()
    @IsOptional()
    @MinLength(1)
    author: string;
    
    @ApiProperty({ description: 'Año de publicación', example: 1990 })
    @IsInt()
    @IsOptional()
    @IsPositive()
    year: number;

    @ApiProperty({ description: 'Disponibilidad', example: "True" })
    @IsBoolean()
    @IsOptional()
    disponibilidad?: boolean;
    
}
