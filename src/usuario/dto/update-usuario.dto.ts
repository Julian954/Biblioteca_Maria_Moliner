import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @ApiProperty({ description: 'Nombre del usuario', example: "Jose Manuel"})
    @IsString()
    @MinLength(1)
    @IsOptional()
    name: string;

    @ApiProperty({ description: 'Correo del usuario', example: "Jmanuel@gmail.com" })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', example: "Safe456" })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string;
}
