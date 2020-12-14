import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosService } from './axios/axios.service';
import { TokenRepository } from './token/token.repository';
import { TokenService } from './token/token.service';
import { ClassValidatorService } from './validators/class-validator.service';

@Module({
    imports: [TypeOrmModule.forRoot()],
    providers: [AxiosService, TokenService, ClassValidatorService, TokenRepository, Logger],
    controllers: [],
})
export class AppModule {}
