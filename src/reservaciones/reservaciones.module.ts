import { Module } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { ReservacionesController } from './reservaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacione } from './entities/reservacione.entity';
import { Libro } from 'src/libros/entities/libro.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacione, Libro]),ScheduleModule.forRoot()],
  controllers: [ReservacionesController],
  providers: [ReservacionesService],
})
export class ReservacionesModule {}
