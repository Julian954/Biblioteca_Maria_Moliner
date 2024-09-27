import { Module } from '@nestjs/common';
import { ReservacionesService } from './reservaciones.service';
import { ReservacionesController } from './reservaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacione } from './entities/reservacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacione])],
  controllers: [ReservacionesController],
  providers: [ReservacionesService],
})
export class ReservacionesModule {}
