import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly UsuarioRepository: Repository<Usuario>, // Correctamente inyectado
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Cifrar la contraseña
    const saltRounds = 10; // Debe ser un número
    const salt = await bcrypt.genSalt(saltRounds); // Genera el salt con un número de rondas adecuado
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt); // Cifrar la contraseña

    // Crear un nuevo usuario con la contraseña cifrada
    const nuevoUsuario = this.UsuarioRepository.create({ // Cambiado a this.UsuarioRepository
      ...createUsuarioDto,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    return await this.UsuarioRepository.save(nuevoUsuario); // Cambiado a this.UsuarioRepository
  }

  async findOneByEmail(email:string){
    return this.UsuarioRepository.findOneBy({email});
  }

  async findAll() {
    return await this.UsuarioRepository.find(); // Cambiado a this.UsuarioRepository
  }

  async findOne(id: number) {
    return await this.UsuarioRepository.findOneBy({ id }); // Cambiado a this.UsuarioRepository
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    if(updateUsuarioDto.password){
      const saltRounds = 10; // Debe ser un número
      const salt = await bcrypt.genSalt(saltRounds); // Genera el salt con un número de rondas adecuado
      const hashedPassword = await bcrypt.hash(updateUsuarioDto.password, salt); // Cifrar la contraseña
      updateUsuarioDto.password = hashedPassword;
    }
    return await this.UsuarioRepository.update(id, updateUsuarioDto); // Cambiado a this.UsuarioRepository
  }

  async remove(id: number) {
    return this.UsuarioRepository.softDelete({ id }); // Cambiado a this.UsuarioRepository
  }
}
