import { Injectable } from '@nestjs/common';
import { CreateReservacioneDto } from './dto/create-reservacione.dto';
import { UpdateReservacioneDto } from './dto/update-reservacione.dto';
import { Reservacione } from './entities/reservacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservacionesService {

  constructor(
    @InjectRepository(Reservacione)
    private readonly ReservacionesRepository: Repository<Reservacione>,
  ){}

  async create(createReservacioneDto: CreateReservacioneDto) {
    return await this.ReservacionesRepository.save(createReservacioneDto);
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
