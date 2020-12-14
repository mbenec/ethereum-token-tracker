import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmDevConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            username: 'ethereum',
            password: 'ethereum',
            database: 'ethereum_dev',
            host: 'localhost',
            autoLoadEntities: true,
            keepConnectionAlive: true,
            port: 5432,
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
        };
    }
}