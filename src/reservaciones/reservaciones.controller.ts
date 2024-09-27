import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiTags('Reservaciones')//Rutas de Reservaciones

@Controller('reservaciones')
export class ReservacionesController {
  constructor(private readonly reservacionesService: ReservacionesService) {}

  @ApiOperation({ summary: 'Crear una nueva reservación' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'La reservación ha sido creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Post()
  create(@Body() createReservacioneDto: CreateReservacioneDto) {
    return this.reservacionesService.create(createReservacioneDto);
  }

  @ApiOperation({ summary: 'Muestra todas las reservación' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Las reservaciónes ha sido mostradas correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Get()
  findAll() {
    return this.reservacionesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una reservación por su ID' })
  @ApiResponse({ status: 200, description: 'Reservación obtenida con éxito' })
  @ApiResponse({ status: 404, description: 'Reservación no encontrada' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservacionesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualiza los campos de una reservación' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'La reservación ha sido actualizada correctamente.' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud o datos inválidos.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservacioneDto: UpdateReservacioneDto) {
    return this.reservacionesService.update(+id, updateReservacioneDto);
  }

  @ApiOperation({ summary: 'Eliminar una reservación' })
  @ApiResponse({ status: 200, description: 'Reservación eliminada con éxito' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservacionesService.remove(+id);
  }
}
