import { PartialType } from '@nestjs/mapped-types';
import { CreateReservacioneDto } from './create-reservacione.dto';
import { IsInt, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservacioneDto extends PartialType(CreateReservacioneDto) {

    @ApiProperty({ description: 'ID del libro que se está reservando', example: 1 })
    @IsInt()
    @IsOptional()
    id_libro: number;

    @ApiProperty({ description: 'ID del usuario que está reservando', example: 1 })
    @IsInt()
    @IsOptional()
    id_usuario: number;

    @ApiProperty({
        description: 'Fecha de inicio de la reservación',
        example: '2024-09-26T08:00:00Z',
        default: new Date().toISOString(), // Establece la fecha actual por defecto
    })
    @IsDateString()
    @IsOptional()
    inicio_reservacion: string;

    @ApiProperty({
        description: 'Fecha de finalización de la reservación',
        example: '2024-10-03T08:00:00Z',
        default: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Una semana después
    })
    @IsDateString()
    @IsOptional()
    final_reservacion: string;
}
