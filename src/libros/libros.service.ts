import { Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibrosService {
  
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ) {}
  
  async create(createLibroDto: CreateLibroDto) {
    return await this.libroRepository.save(createLibroDto);
  }

  async findAll() {
    return await this.libroRepository.find();
  }

  async findOne(id: number) {
    return await this.libroRepository.findOneBy({ id });
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    return await this.libroRepository.update(id, updateLibroDto);
  }

  async remove(id: number) {
    return await this.libroRepository.softDelete({ id });
  }
}
