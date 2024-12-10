import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigurationsService } from './configurations/configurations.service';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  const configurationsService = app.get(ConfigurationsService);

  app.use(helmet(configurationsService.helmetConfig));
  app.use(cookieParser());

  app.enableCors(configurationsService.corsConfig);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  // swagger
  if (configurationsService.isDevelopment) {
    const swaggerDocumentBuilder = new DocumentBuilder();
    swaggerDocumentBuilder.setTitle('Traveo')
    swaggerDocumentBuilder.setDescription("Trip planner API")
    swaggerDocumentBuilder.setVersion('1.0')

    const swaggerDocumentBuild = swaggerDocumentBuilder.build();
    const documentFactory = () => SwaggerModule.createDocument(app, swaggerDocumentBuild);
    SwaggerModule.setup('docs', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3456, () => logger.log(`Application running on ${process.env.PORT}`));
}

bootstrap();
