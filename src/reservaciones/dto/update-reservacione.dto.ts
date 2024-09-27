import { PartialType } from '@nestjs/mapped-types';
import { CreateReservacioneDto } from './create-reservacione.dto';
import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class UpdateReservacioneDto extends PartialType(CreateReservacioneDto) {

    @IsInt()
    @IsOptional()
    id_libro: number;

    @IsInt()
    @IsOptional()
    id_usuario: number;

    @IsDateString()
    @IsOptional()
    inicio_reservacion: Date;

    @IsDateString()
    @IsOptional()
    final_reservacion: Date;
}
