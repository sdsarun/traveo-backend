import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors();

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  // swagger
  const swaggerDocumentBuilder = new DocumentBuilder();
  swaggerDocumentBuilder.setTitle('Traveo')
  swaggerDocumentBuilder.setDescription("Trip planner API")
  swaggerDocumentBuilder.setVersion('1.0')

  const swaggerDocumentBuild = swaggerDocumentBuilder.build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerDocumentBuild);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
