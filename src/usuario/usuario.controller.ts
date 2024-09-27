import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')//Rutas de Usuarios
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Agregar un nuevo usuario' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El usuario ha sido agregado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Mostrar todos los usuarios' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Los usuarios han sido mostrados correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El usuario ha sido obtenido correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualiza los campos de un usuario' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El usuario ha sido actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El usuario ha sido eliminado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
