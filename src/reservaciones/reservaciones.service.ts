import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';
import { Reservacione } from './entities/reservacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Libro } from 'src/libros/entities/libro.entity';// Importar Usuario
import { Cron } from '@nestjs/schedule';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ReservacionesService {

  constructor(
    @InjectRepository(Reservacione)
    private readonly reservacionesRepository: Repository<Reservacione>,

    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Inyectar Usuario
  ) {}

  private readonly logger = new Logger(Reservacione.name);

  // Cron job para liberar libros cuya reservación ha expirado
  @Cron('*/1 * * * *')
  async handleCron() {
    const now = new Date();
    try {
      const reservacionesExpiradas = await this.reservacionesRepository.find({
        where: { final_reservacion: LessThan(now) },
      });
      
      for (const reservacion of reservacionesExpiradas) {
        const libro = await this.libroRepository.findOneBy({ id: reservacion.libro.id });
        if (libro && libro.disponibilidad === false) {
          this.logger.debug(`Libro encontrado y actualizado: ${libro.id}`);
          libro.disponibilidad = true;
          await this.libroRepository.save(libro);
          await this.reservacionesRepository.softDelete({ id: reservacion.id });
        }
      }
    } catch (error) {
      console.error('Error al procesar las reservaciones expiradas:', error);
    }
  }

  // Crear una nueva reservación
  async create(createReservacioneDto: CreateReservacioneDto) {
    // Buscar el libro
    const libro = await this.libroRepository.findOneBy({ id: createReservacioneDto.id_libro });
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    // Verificar si el libro ya está reservado
    if (!libro.disponibilidad) {
      throw new NotFoundException('Libro no disponible para reservación');
    }

    // Buscar el usuario
    const usuario = await this.usuarioRepository.findOneBy({ id: createReservacioneDto.id_usuario });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Crear la reservación y asociar libro y usuario
    const reservacion = this.reservacionesRepository.create({
      ...createReservacioneDto,
      libro,
      usuario,
    });

    // Marcar el libro como no disponible
    libro.disponibilidad = false;
    await this.libroRepository.save(libro);

    // Guardar la reservación en la base de datos
    return await this.reservacionesRepository.save(reservacion);
  }

  // Obtener todas las reservaciones
  async findAll() {
    return await this.reservacionesRepository.find({
      relations: ['libro', 'usuario'], // Incluir relaciones en la respuesta
    });
  }

  // Obtener una reservación por ID
  async findOne(id: number) {
    const reservacion = await this.reservacionesRepository.findOne({
      where: { id },
      relations: ['libro', 'usuario'], // Incluir relaciones en la respuesta
    });

    if (!reservacion) {
      throw new NotFoundException('Reservación no encontrada');
    }

    return reservacion;
  }

  // Actualizar una reservación
  async update(id: number, updateReservacioneDto: UpdateReservacioneDto) {
    const reservacion = await this.findOne(id);
    if (!reservacion) {
      throw new NotFoundException('Reservación no encontrada');
    }

    // Actualizar la reservación
    return await this.reservacionesRepository.save({
      ...reservacion,
      ...updateReservacioneDto,
    });
  }

  // Eliminar una reservación (Soft Delete)
  async remove(id: number) {
    const reservacion = await this.findOne(id);
    if (!reservacion) {
      throw new NotFoundException('Reservación no encontrada');
    }

    // Marcar el libro como disponible de nuevo
    reservacion.libro.disponibilidad = true;
    await this.libroRepository.save(reservacion.libro);

    // Soft delete de la reservación
    return await this.reservacionesRepository.softDelete(id);
  }
}
