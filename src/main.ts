import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('API Biblioteca')
  .setDescription('Documentación de la API para gestionar libros y reservaciones')
  .setVersion('1.0')
  .addBearerAuth() // Habilitar Bearer Auth
  .build();

  const document = SwaggerModule.createDocument(app, config);
  // Reordenar los tags manualmente
  const tagsOrder = ['Authentication', 'Libros', 'Reservaciones', 'Usuarios']; // Aquí pones el orden que deseas
  document.tags.sort((a, b) => tagsOrder.indexOf(a.name) - tagsOrder.indexOf(b.name)); // Reordenar los tags
  SwaggerModule.setup('api', app, document); // La documentación estará disponible en /api

  await app.listen(3000);
}
bootstrap();
