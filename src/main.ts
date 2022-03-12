import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // PIPES
  app.useGlobalPipes(new ValidationPipe());
  // FOR SWAGGER START
  const config = new DocumentBuilder()
    .setTitle('Nest Api')
    .setDescription('can add description here for the API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  // END
  await app.listen(3333);
}
bootstrap();
