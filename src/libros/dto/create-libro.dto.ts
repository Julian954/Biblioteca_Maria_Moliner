import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateLibroDto {

    @ApiProperty({ description: 'Titulo del Libro', example: "Piedras de acero" })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Nombre del autor', example: "Jose Gaspar" })
    @IsString()
    author: string;
    
    @ApiProperty({ description: 'Año de publicación', example: 1990 })
    @IsInt()
    year: number;

    @ApiProperty({ description: 'Disponibilidad', example: "True" })
    @IsBoolean()
    @IsOptional()
    disponibilidad?: boolean;
}
