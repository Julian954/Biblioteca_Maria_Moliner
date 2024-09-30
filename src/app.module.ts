import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule
import { LibrosModule } from './libros/libros.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ReservacionesModule } from './reservaciones/reservaciones.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
      envFilePath: '.env', // Indica el archivo .env que estamos usando
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, // Usar la variable de entorno DB_HOST
      port: +process.env.DB_PORT, // Usar la variable de entorno DB_PORT
      username: process.env.DB_USERNAME, // Usar la variable de entorno DB_USERNAME
      password: process.env.DB_PASSWORD, // Usar la variable de entorno DB_PASSWORD
      database: process.env.DB_NAME, // Usar la variable de entorno DB_NAME
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    LibrosModule,
    ReservacionesModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
