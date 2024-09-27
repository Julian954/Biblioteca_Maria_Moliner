import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty({ description: 'Nombre del usuario', example: "Jose Manuel"})
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({ description: 'Correo del usuario', example: "Jmanuel@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', example: "Safe456" })
    @IsString()
    @MinLength(6)
    password: string;
}
