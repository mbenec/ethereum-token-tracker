import { AxiosService } from './api/axios/axios.service';
import { Connection } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSeedDevConfig } from './config/typeorm/seed-dev';
import { Logger, Module } from '@nestjs/common';
import { TokenRepository } from './api/token/token.repository';
import { ClassValidatorService } from './api/validators/class-validator.service';
import { TokenService } from './api/token/token.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmSeedDevConfig,
        }),
    ],
    providers: [AxiosService, TokenRepository, Logger, ClassValidatorService, TokenService],
})
class SeedModule {}

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeedModule);

    const connection: Connection = app.get(Connection);
    await connection.synchronize(true);
    const tokenService: TokenService = app.get(TokenService);

    const count = await tokenService.insertAllTokens();
    // eslint-disable-next-line no-console
    console.log("Inserted total of " + count + " tokens.");
    // eslint-disable-next-line no-console
    console.log('Database seeded.');
}

bootstrap();
