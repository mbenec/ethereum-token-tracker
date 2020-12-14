import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useLogger(new Logger(undefined, true));
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
