import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsEmail } from "class-validator";
import { Transform } from 'class-transformer';

export class RegisterDto {
    
    @ApiProperty({ description: 'Nombre del usuario', example: "Jose Manuel"})
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({ description: 'Correo del usuario', example: "Jmanuel@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', example: "Safe456" })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
    
}