import { IsDateString, IsInt } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CreateReservacioneDto {

    @IsInt()
    id_libro: number;

    @IsInt()
    id_usuario: number;

    @IsDateString()
    inicio_reservacion: Date;

    @IsDateString()
    final_reservacion: Date;

}