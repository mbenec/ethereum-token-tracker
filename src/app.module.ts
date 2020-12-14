import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosService } from './api/axios/axios.service';
import { TokenRepository } from './api/token/token.repository';
import { TokenService } from './api/token/token.service';
import { ClassValidatorService } from './api/validators/class-validator.service';
import { ScheduleService } from './api/node-schedule/scheduler.service';
import { TokenController } from './api/token/token.controller';

@Module({
    imports: [TypeOrmModule.forRoot()],
    providers: [
        AxiosService,
        TokenService,
        ClassValidatorService,
        TokenRepository,
        Logger,
        ScheduleService,
    ],
    controllers: [TokenController],
})
export class AppModule {}
