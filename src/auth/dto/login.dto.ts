import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{

    @ApiProperty({ description: 'Correo del usuario', example: "example@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario', example: "safe1234" })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}