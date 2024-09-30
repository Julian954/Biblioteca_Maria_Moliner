import { BadRequestException, Get, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDto:RegisterDto){

        const user = await this.usuarioService.findOneByEmail(registerDto.email);

        if(user){
            throw new BadRequestException('El usuario ya existe');
        }

        return await this.usuarioService.create(registerDto);
    }

    async login(loginDto:LoginDto){

        const user = await this.usuarioService.findOneByEmail(loginDto.email);

        if(!user){
            throw new UnauthorizedException('El usuario no existe');
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password, (await user).password);
        
        if(!isPasswordValid){
            throw new UnauthorizedException('La contraseña es incorrecta');
        }

        const payload = {email: user.email};
        const token =  await this.jwtService.signAsync(payload)
        
        return {
            token,
            user
        }

    }

}
