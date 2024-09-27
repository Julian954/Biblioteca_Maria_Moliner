import { Injectable, Logger } from '@nestjs/common';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';
import { Reservacione } from './entities/reservacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Libro } from 'src/libros/entities/libro.entity';
import { NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReservacionesService {

  constructor(
    @InjectRepository(Reservacione)
    private readonly ReservacionesRepository: Repository<Reservacione>,

    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ){}

  private readonly logger = new Logger(Reservacione.name);
  @Cron('*/1 * * * *')
  async handleCron() {
    //this.logger.debug('Ejecutando cron job cada 1 minutos');
    const now = new Date();
    try {
      const reservacionesExpiradas = await this.ReservacionesRepository.find({where: {final_reservacion: LessThan(now),},});
      for (const reservacion of reservacionesExpiradas) {
        const libro = await this.libroRepository.findOneBy({ id: reservacion.id_libro });
        if (libro && libro.disponibilidad === false) {
          this.logger.debug(`Libro encontrado y actualizado: ${libro.id}`);
          libro.disponibilidad = true;
          await this.libroRepository.save(libro);
          await this.ReservacionesRepository.softDelete({ id: reservacion.id });
        }
      }
    } catch (error) {
      // Puedes registrar el error usando un logger
      console.error('Error al procesar las reservaciones expiradas:', error);
    }
  }
  
  async create(createReservacioneDto: CreateReservacioneDto) {

    const libro = await this.libroRepository.findOneBy({ id: createReservacioneDto.id_libro });
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    // Verificar si el libro ya está reservado
    if (!libro.disponibilidad) {
      throw new NotFoundException('Libro no disponible');
    }

    libro.disponibilidad = false;
    await this.libroRepository.save(libro);

    const reservacion = this.ReservacionesRepository.create(createReservacioneDto);
    return await this.ReservacionesRepository.save(reservacion);
  }

  async findAll() {
    return await this.ReservacionesRepository.find();
  }

  async findOne(id: number) {
    return await this.ReservacionesRepository.findOneBy({ id });
  }

  async update(id: number, updateReservacioneDto: UpdateReservacioneDto) {
    return await this.ReservacionesRepository.update(id, updateReservacioneDto);
  }

  async remove(id: number) {
    return await this.ReservacionesRepository.softDelete({ id });
  }
}
