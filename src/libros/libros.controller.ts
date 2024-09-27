import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Libros')//Rutas de Libros
@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @ApiOperation({ summary: 'Agregar un nuevo libro' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El libro ha sido agregado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.librosService.create(createLibroDto);
  }

  @ApiOperation({ summary: 'Mostrar todos los libros' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Los libros han sido mostrados correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un libro por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El libro ha sido obtenido correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.librosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualiza los campos de un libro' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El libro ha sido actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(+id, updateLibroDto);
  }

  @ApiOperation({ summary: 'Eliminar un libro' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El libro ha sido eliminado correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.librosService.remove(+id);
  }
}
