import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/http-exception-filter';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const message = errors
          .map((err) => {
            if (err.constraints) {
              return Object.values(err.constraints).join(', ');
            }
            return '';
          })
          .join(', ');
        return new BadRequestException(message);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Employee management')
    .setDescription('API for employee management')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
