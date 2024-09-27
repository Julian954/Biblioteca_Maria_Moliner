import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CreateReservacioneDto {

    @ApiProperty({ description: 'ID del libro que se está reservando', example: 1 })
    @IsInt()
    id_libro: number;

    @ApiProperty({ description: 'ID del usuario que está reservando', example: 1 })
    @IsInt()
    id_usuario: number;

    @ApiProperty({
        description: 'Fecha de inicio de la reservación',
        example: '2024-09-26T08:00:00Z',
        default: new Date().toISOString(), // Establece la fecha actual por defecto
    })
    @IsDateString()
    inicio_reservacion: string = new Date().toISOString();

    @ApiProperty({
        description: 'Fecha de finalización de la reservación',
        example: '2024-10-03T08:00:00Z',
        default: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Una semana después
    })
    @IsDateString()
    final_reservacion: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(); // Valor por defecto

}