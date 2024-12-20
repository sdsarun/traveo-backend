import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigurationsService } from './configurations/configurations.service';
import { clerkMiddleware, verifyToken } from '@clerk/express';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  const configurationsService = app.get(ConfigurationsService);

  app.use(helmet(configurationsService.helmetConfig));
  app.use(cookieParser());
  app.use(clerkMiddleware(configurationsService.clerkConfig));

  app.useGlobalPipes(
    new ValidationPipe(configurationsService.validationPipeConfig),
  );

  app.enableCors(configurationsService.corsConfig);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // swagger
  if (configurationsService.isDevelopment) {
    const swaggerDocumentBuilder = new DocumentBuilder();
    swaggerDocumentBuilder.setTitle('Traveo');
    swaggerDocumentBuilder.setDescription('Trip planner API');
    swaggerDocumentBuilder.setVersion('1.0');
    swaggerDocumentBuilder.addBearerAuth();

    const swaggerDocumentBuild = swaggerDocumentBuilder.build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, swaggerDocumentBuild);
    SwaggerModule.setup('docs', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3456, async () => {
    const url = await app.getUrl();
    logger.log(`Application running on ${url}`);
  });
}

bootstrap();
