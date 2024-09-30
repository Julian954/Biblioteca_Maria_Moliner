import { Body, Controller, Get, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')//Rutas de Authenticación
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción de la operación
    @ApiResponse({ status: 201, description: 'El usuario ha sido creada correctamente.' })
    @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
    @Post('register')
    register(@Body() RegisterDto: RegisterDto) 
    {

        return this.authService.register(RegisterDto);
    }

    @ApiOperation({ summary: 'Loguear un usuario' }) // Descripción de la operación
    @ApiResponse({ status: 201, description: 'El usuario ha sido logeado correctamente.' })
    @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    
    @ApiBearerAuth() // Indicar que este endpoint usa autenticación Bearer
    @ApiOperation({ summary: 'Mostrar el perfil del usuario autenticado' }) // Documentar petición de perfil
    @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado.' })
    @ApiResponse({ status: 401, description: 'Token no válido o no proporcionado.' })
    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req) {
      return req.user;
    }
}
 